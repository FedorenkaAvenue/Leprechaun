import { FilePond, FilePondProps, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import FilePondPluginImageEdit from 'filepond-plugin-image-edit';
import { forwardRef, useState } from 'react';
import { ActualFileObject, FilePondFile, FilePondInitialFile } from 'filepond';
import { Typography } from '@mui/material';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

registerPlugin(
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview,
    FilePondPluginImageEdit,
    FilePondPluginFileValidateType,
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview,
    FilePondPluginImageEdit,
    FilePondPluginImagePreview,
    FilePondPluginImageEdit,
    FilePondPluginImageEdit
);

export type FileUploaderFile = FilePondFile["file"];
interface Props extends FilePondProps {
    value: Blob[] | undefined,
    onChange: (images: FileUploaderFile | FileUploaderFile[]) => void
    error?: string
}

const FileUploader = forwardRef<FilePond, Props>(({ value = [], onChange, error, allowMultiple, ...props }, ref) => {
    const [files, setFiles] = useState<(FilePondInitialFile | ActualFileObject | Blob | string)[]>(value);

    function onUpdate(files: FilePondFile[]) {
        //@ts-ignore
        setFiles(allowMultiple ? files : files[0]);
        onChange(allowMultiple ? files.map(i => i.file) : files[0].file);
    }

    return (
        <div>
            {error && <Typography align='center' color='error'>{error}</Typography>}
            <FilePond
                ref={ref}
                files={files}
                onreorderfiles={onUpdate}
                allowReorder
                styleButtonRemoveItemPosition='right'
                credits={false}
                onupdatefiles={onUpdate}
                allowMultiple={allowMultiple}
                {...props}
            />
        </div>
    );
});

export default FileUploader;
