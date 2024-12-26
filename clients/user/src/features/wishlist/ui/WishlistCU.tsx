import { FC } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';

import Dialog from '@shared/ui/Dialog';
import { useI18n } from '@shared/lib/i18n_client';
import { Button } from '@shared/ui/Button';
import { InputText } from '@shared/ui/Input';
import { Checkbox } from '@shared/ui/Checkbox';
import { CreateWishlistDTO } from '@features/wishlist/api/dto';
import { createWishlistSchema } from '@features/wishlist/model/schemas';
import interpolate from '@shared/lib/interpolate';
import { WISHLIST_TITLE_MIN_TEXT_LENGHT } from '@features/wishlist/constants/schames';
import { Form, FormControl, FormField, FormItem, FormMessage, Label } from '@shared/ui/Form';

interface Props {
    handleSubmit: (data: CreateWishlistDTO) => void
    trans: {
        title: string | undefined
        submitButton: string | undefined
    }
    initForm?: CreateWishlistDTO
}

const WishlistCU: FC<Props> = ({ handleSubmit, trans, initForm }) => {
    const { dictionary } = useI18n();
    const form = useForm<CreateWishlistDTO>({
        resolver: zodResolver(createWishlistSchema),
        defaultValues: initForm || { title: dictionary?.wishList.newListName, isDefault: false },
    });

    return (
        <Dialog.Content>
            <Dialog.Header>
                <Dialog.Title>{trans.title}</Dialog.Title>
            </Dialog.Header>
            <Form {...form}>
                <form id='new-wishlist' onSubmit={form.handleSubmit(handleSubmit)} className='grid gap-2'>
                    <FormField
                        control={form.control}
                        name='title'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <InputText {...field} placeholder={dictionary?.wishList.newListName} />
                                </FormControl>
                                <FormMessage>
                                    {interpolate(
                                        //@ts-ignore
                                        dictionary?.errors[form.formState.errors.title?.message],
                                        [WISHLIST_TITLE_MIN_TEXT_LENGHT],
                                    )}
                                </FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='isDefault'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Checkbox
                                        disabled={initForm?.isDefault}
                                        onCheckedChange={field.onChange}
                                        checked={field.value}
                                    />
                                </FormControl>
                                <Label htmlFor='make-default'>{dictionary?.wishList.makeListAsDefault}</Label>
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
            <Dialog.Footer className='flex justify-center gap-1'>
                <Dialog.Close asChild>
                    <Button type="button" variant="secondary">
                        {dictionary?.common.cancel}
                    </Button>
                </Dialog.Close>
                <Button form='new-wishlist' type='submit' variant='default'>
                    {trans.submitButton}
                </Button>
            </Dialog.Footer>
        </Dialog.Content>
    );
};

export default WishlistCU;
