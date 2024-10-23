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
    onChange: (images: FileUploaderFile[]) => void
    error?: string
}

const FileUploader = forwardRef<FilePond, Props>(({ value = [], onChange, error, ...props }, ref) => {
    const [files, setFiles] = useState<(FilePondInitialFile | ActualFileObject | Blob | string)[]>(value);

    function onUpdate(files: FilePondFile[]) {
        //@ts-ignore
        setFiles(files);
        onChange(files.map(i => i.file));
    }

    return (
        <div>
            {error && <Typography align='center' color='error'>{error}</Typography>}
            <FilePond
                ref={ref}
                files={files}
                allowMultiple
                onreorderfiles={onUpdate}
                allowReorder
                maxFiles={props.maxFiles || 10}
                styleButtonRemoveItemPosition='right'
                credits={false}
                onupdatefiles={onUpdate}
                {...props}
            />
        </div>
    );
});

export default FileUploader;
