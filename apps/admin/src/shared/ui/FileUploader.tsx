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
    FilePondPluginFileValidateType,
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview,
    FilePondPluginImageEdit,
);

export type FileUploaderFile = FilePondFile["file"];
interface Props extends FilePondProps {
    value: Blob[] | undefined,
    onChange: (images: FileUploaderFile | FileUploaderFile[]) => void
    error?: string
}

const FileUploader = forwardRef<FilePond, Props>(({ value = [], onChange, error, allowMultiple, ...props }, ref) => {
    const [files, setFiles] = useState<(FilePondInitialFile | ActualFileObject | Blob | string)[]>(value);

    function onUpdate(updatedFiles: FilePondFile[]) {
        const newFiles = allowMultiple ? updatedFiles : updatedFiles.slice(0, 1);
        //@ts-ignore
        setFiles(newFiles);
        onChange(allowMultiple ? newFiles.map((file) => file.file) : newFiles[0].file);
    }

    return (
        <div>
            {error && <Typography align='center' color='error'>{error}</Typography>}
            <FilePond
                ref={ref}
                files={files}
                // onreorderfiles={onUpdate} // ? maybe be bugged during file loading
                allowReorder
                styleButtonRemoveItemPosition='right'
                credits={false}
                onupdatefiles={onUpdate}
                allowMultiple={allowMultiple}
                allowFileTypeValidation={true}
                {...props}
            />
        </div>
    );
});

export default FileUploader;
