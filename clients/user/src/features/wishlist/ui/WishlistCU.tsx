import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useI18n } from '@shared/lib/i18n_client';
import { CreateWishlistDTO } from '@features/wishlist/api/dto';
import { createWishlistSchema } from '@features/wishlist/model/schemas';
import interpolate from '@shared/lib/interpolate';
import { WISHLIST_TITLE_MIN_TEXT_LENGHT } from '@features/wishlist/constants/schames';
import { DialogClose, DialogFooter, DialogHeader, DialogTitle } from '@primitives/ui/dialog';
import { Button } from '@primitives/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@primitives/ui/form';
import { Checkbox } from '@primitives/ui/checkbox';
import { Label } from '@primitives/ui/label';
import { Input } from '@primitives/ui/input';

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
        <>
            <DialogHeader>
                <DialogTitle>{trans.title}</DialogTitle>
            </DialogHeader>
            <Form {...form}>
                <form id='new-wishlist' onSubmit={form.handleSubmit(handleSubmit)} className='grid gap-2'>
                    <FormField
                        control={form.control}
                        name='title'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field} placeholder={dictionary?.wishList.newListName} />
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
                            <FormItem className='flex gap-1 items-center'>
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
            <DialogFooter className='flex justify-center gap-1'>
                <DialogClose asChild>
                    <Button type='button' variant='secondary'>
                        {dictionary?.common.cancel}
                    </Button>
                </DialogClose>
                <DialogClose asChild>
                    <Button form='new-wishlist' type='submit'>
                        {trans.submitButton}
                    </Button>
                </DialogClose>
            </DialogFooter>
        </>
    );
};

export default WishlistCU;
