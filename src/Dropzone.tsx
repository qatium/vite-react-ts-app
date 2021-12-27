import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import shpjs from 'shpjs';

class FileRead {
    static contentFrom = (file: File): Promise<string> => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (): void => {
                const content = reader.result;
                resolve(content as string);
            };
            reader.readAsText(file);
        });
    };

    static arrayBufferFrom = (file: File): Promise<ArrayBuffer> => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (): void => {
                const content = reader.result;
                resolve(content as ArrayBuffer);
            };
            reader.readAsArrayBuffer(file);
        });
    };
}

async function convertToGeojson(files: File[]) {
    const geometries = files.find(({ name }) => name.toLowerCase().endsWith(".shp"));
    const properties = files.find(({ name }) => name.toLowerCase().endsWith(".dbf"));
    const projection = files.find(({ name }) => name.toLowerCase().endsWith(".prj"));
    const propertiesEncoding = files.find(({ name }) => name.toLowerCase().endsWith(".cpg"));

    if (!geometries || !properties || !projection) {
        console.error("please provide all files")
        return
    }

    const encoding = !propertiesEncoding
        ? "UTF-8"
        : await FileRead.contentFrom(propertiesEncoding);

    const combined = shpjs.combine([
        await shpjs
            .parseShp(
                await FileRead.arrayBufferFrom(geometries),
                await FileRead.contentFrom(projection)
            ),
        await shpjs
            .parseDbf(
                await FileRead.arrayBufferFrom(properties),
                Buffer.from(encoding)
            )
    ]);
    return combined;
}

function MyDropzone() {
    const onDrop = useCallback(acceptedFiles => {
        convertToGeojson(acceptedFiles).then(
            (content) => console.log("Parsed:", content)
        )
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p>Drag 'n' drop some files here, or click to select files</p>
            }
        </div>
    )
}

export default MyDropzone