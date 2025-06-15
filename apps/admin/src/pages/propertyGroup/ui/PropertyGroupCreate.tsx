import { FormControl, FormControlLabel, FormLabel, Switch } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";

import { propertyGroupSchema } from "@features/propertyGroup/models/schema";
import TextInput from "@shared/ui/TextInput";
import { useCreatePropertyGroup } from "@features/propertyGroup/models/hooks";
import { PropertyGroupCreateDTO } from "@features/propertyGroup/api/dto";
import withRoleGuardPage from "@shared/hocs/withRoleGuardPage";
import { UserRole } from "@gen/user";

const PropertyGroupCreatePage = () => {
    const nav = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<PropertyGroupCreateDTO>({
        resolver: zodResolver(propertyGroupSchema),
    });
    const [mutate, { isLoading }] = useCreatePropertyGroup();
    const sendForm: SubmitHandler<PropertyGroupCreateDTO> = data => {
        mutate({ data, successCallback: () => nav(-1) });
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
            <TextInput {...register('altName')} r label="alt name" error={errors.altName?.message} />
            <FormControl>
                <FormControlLabel control={
                    <Switch {...register('isPrimary')} />
                }
                    label="primary" />
            </FormControl>
            <TextInput {...register('comment')} label="comment" multiline className="w-full" />
            <div className="w-full flex justify-center">
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

export default withRoleGuardPage(PropertyGroupCreatePage, UserRole.ADMIN);
