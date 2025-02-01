import { FormControl, FormControlLabel, FormLabel, Switch } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import FileUploader from "@shared/ui/FileUploader";
import TextInput from "@shared/ui/TextInput";
import PropertyGroupSelectList from '@widgets/propertyGroup/ui/PropertyGroupSelectList';
import { useCreateCategory } from '@features/category/model/hooks';
import { CategoryCreateDTO } from '@features/category/api/dto';
import withRoleGuardPage from '@shared/hocs/withRoleGuardPage';
import { UserRole } from '@entities/user/model/enums';

const CategoryCreatePage = () => {
    const nav = useNavigate();
    const { register, handleSubmit, getValues, watch, setValue, formState: { errors } } = useForm<CategoryCreateDTO>({
        defaultValues: {
            propertygroups: [],
        }
    });
    const [create, createState] = useCreateCategory();

    const sendForm: SubmitHandler<CategoryCreateDTO> = body => {
        create({ body, successCallback: () => nav(-1) });
    };

    watch('propertygroups');

    return (
        <form onSubmit={handleSubmit(sendForm)} className="flex gap-4 flex-col items-baseline">
            <div className='flex items-center gap-4'>
                <TextInput {...register('url')} r label="url" error={errors.url?.message} />
                <FormControl>
                    <FormControlLabel control={
                        <Switch {...register('is_public')} />
                    }
                        label="public" />
                </FormControl>
            </div>
            <div>
                <FormLabel component="legend">Title</FormLabel>
                <div className="flex gap-1">
                    <TextInput {...register('title.en')} r label="eng" error={errors.title?.en?.message} />
                    <TextInput {...register('title.ru')} r label="ru" error={errors.title?.ru?.message} />
                    <TextInput {...register('title.ua')} r label="ua" error={errors.title?.ua?.message} />
                </div>
            </div>
            <TextInput {...register('comment')} label="comment" multiline />
            <FileUploader
                {...register('icon')}
                onChange={file => { setValue('icon', file) }}
                name="icon"
                acceptedFileTypes={['image/svg+xml']}
                value={getValues('icon')}
                maxFiles={1}
                labelIdle={`Drag & Drop category svg icon or <span class="filepond--label-action">Browse</span>`}
            />
            <PropertyGroupSelectList {...register('propertygroups')} value={getValues('propertygroups')} />
            <div className="w-full flex justify-center">
                <LoadingButton
                    type='submit'
                    loading={createState.isLoading}
                    loadingPosition="center"
                    variant="contained"
                >
                    Save
                </LoadingButton>
            </div>
        </form >
    );
};

export default withRoleGuardPage(CategoryCreatePage, UserRole.ADMIN);
