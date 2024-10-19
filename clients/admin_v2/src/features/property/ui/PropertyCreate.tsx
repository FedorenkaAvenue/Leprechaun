import { Button, FormLabel, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import LoadingButton from '@mui/lab/LoadingButton';
import { useCreateProperty } from "@features/property/api/hook";
import PropertyGroupModel from "@entities/propertyGroup/model/PropertyGroup";
import { PropertyCreateDTO } from "@features/property/models/dto";

interface Props {
    groupId: PropertyGroupModel['id']
    handleClose: () => void
}

const PropertyCreate = ({ groupId, handleClose }: Props) => {
    const { mutate, isPending } = useCreateProperty(groupId, handleClose);
    const { handleSubmit, register } = useForm<PropertyCreateDTO>();

    function sendForm(data: PropertyCreateDTO) {
        mutate(data);
    }

    return (
        <form onSubmit={handleSubmit(sendForm)} className="flex gap-6 flex-col">
            <div className="flex flex-col gap-1">
                <div>
                    <FormLabel component="legend">Title</FormLabel>
                    <div className="flex gap-1">
                        <TextField {...register('title.en')} required id="outlined-basic" label="eng" variant="outlined" />
                        <TextField {...register('title.ru')} required id="outlined-basic" label="ru" variant="outlined" />
                        <TextField {...register('title.ua')} required id="outlined-basic" label="ua" variant="outlined" />
                    </div>
                </div>
                <TextField {...register('alt_name')} required id="outlined-basic" label="alt name" variant="outlined" />
                <TextField {...register('comment')} id="outlined-basic" label="comment" variant="outlined" />
            </div>
            <div className="w-full flex justify-center">
                <Button onClick={handleClose}>Cancel</Button>
                <LoadingButton
                    type='submit'
                    loading={isPending}
                    loadingPosition="center"
                    variant="contained"
                >
                    Save
                </LoadingButton>
            </div>
        </form >
    );
};

export default PropertyCreate;
