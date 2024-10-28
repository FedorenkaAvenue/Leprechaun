import { FormControl, FormControlLabel, FormLabel, Switch } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCreatePropertyGroup } from "@features/propertyGroup/api/hooks";
import PropertyGroupSchema, { PropertyGroupSchemaT } from "@features/propertyGroup/models/schema";
import TextInput from "@shared/ui/TextInput";

const PropertyGroupCreateWidget = () => {
    const nav = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<PropertyGroupSchemaT>({
        resolver: zodResolver(PropertyGroupSchema),
    });
    const { mutate, isPending } = useCreatePropertyGroup(() => nav(-1));
    const sendForm: SubmitHandler<PropertyGroupSchemaT> = data => {
        mutate(data);
    };

    return (
        <form onSubmit={handleSubmit(sendForm)} className="flex gap-4 flex-col items-baseline">
            <div>
                <FormLabel component="legend">Title</FormLabel>
                <div className="flex gap-1">
                    <TextInput {...register('title.en')} r label="eng" error={errors.title?.en?.message} />
                    <TextInput {...register('title.ru')} r label="ru" error={errors.title?.ru?.message} />
                    <TextInput {...register('title.ua')} r label="ua" error={errors.title?.ua?.message} />
                </div>
            </div>
            <TextInput {...register('alt_name')} r label="alt name" error={errors.alt_name?.message} />
            <FormControl>
                <FormControlLabel control={
                    <Switch {...register('is_primary')} />
                }
                    label="primary" />
            </FormControl>
            <TextInput {...register('comment')} label="comment" multiline className="w-full" />
            <div className="w-full flex justify-center">
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

export default PropertyGroupCreateWidget;
