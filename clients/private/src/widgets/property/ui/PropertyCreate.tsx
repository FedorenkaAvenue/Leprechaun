import { Button, FormLabel } from "@mui/material";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import LoadingButton from '@mui/lab/LoadingButton';

import TextInput from "@shared/ui/TextInput";
import { useCreateProperty } from "@features/property/models/hook";
import { PropertyGroupPreview } from "@entities/propertyGroup/model/interfaces";
import { propertySchema } from "@features/property/models/schema";
import { PropertyCreateDTO } from "@features/property/api/dto";

interface Props {
    groupId: PropertyGroupPreview['id']
    handleClose: () => void
}

const PropertyCreateWidget = ({ groupId, handleClose }: Props) => {
    const [mutate, { isLoading }] = useCreateProperty();
    const { handleSubmit, register, formState: { errors } } = useForm<PropertyCreateDTO>({
        resolver: zodResolver(propertySchema),
    });

    function sendForm(data: PropertyCreateDTO) {
        mutate({
            data: { ...data, propertygroup: groupId },
            successCallback: handleClose,
        });
    }

    return (
        <form onSubmit={handleSubmit(sendForm)} className="flex gap-6 flex-col">
            <div className="flex flex-col gap-4">
                <div>
                    <FormLabel component="legend">Title</FormLabel>
                    <div className="flex gap-1">
                        <TextInput {...register('title.en')} r label="eng" error={errors.title?.en?.message} />
                        <TextInput {...register('title.ru')} r label="ru" error={errors.title?.ru?.message} />
                        <TextInput {...register('title.ua')} r label="ua" error={errors.title?.ua?.message} />
                    </div>
                </div>
                <TextInput {...register('alt_name')} r label="alt name" error={errors.alt_name?.message} />
                <TextInput {...register('comment')} label="comment" multiline />
            </div>
            <div className="w-full flex justify-center">
                <Button onClick={handleClose}>Cancel</Button>
                <LoadingButton
                    type='submit'
                    loading={isLoading}
                    loadingPosition="center"
                    variant="contained"
                >
                    Save
                </LoadingButton>
            </div>
        </form >
    );
};

export default PropertyCreateWidget;
