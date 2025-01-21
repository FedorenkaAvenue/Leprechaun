'use client'

import { Bell, BellPlus } from 'lucide-react';
import { FC, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { ProductCardModel } from '@entities/product/model/interfaces';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from '@primitives/ui/dialog';
import { Button } from '@primitives/ui/button';
import { useI18n } from '@shared/lib/i18n_client';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@primitives/ui/form';
import { Input } from '@primitives/ui/input';
import { twConfig } from '@root/tailwind.config';
import { useSubscribeProductStatus } from '../model/hooks';
import { SubscribeProductStatusSchema } from '../model/schemas';
import { useProductStatusSubscriptions } from '@entities/subscribtion/model/hooks';
import { TooltipWrapper } from '@primitives/ui/tooltip';

interface Props {
    productId: ProductCardModel['id']
}

const SubscribeProductStatus: FC<Props> = ({ productId }) => {
    const [isOpen, setOpen] = useState(false);
    const { dictionary } = useI18n();
    const { data: subscriptions } = useProductStatusSubscriptions();
    const { mutate, isPending } = useSubscribeProductStatus(productId);
    const form = useForm<SubscribeProductStatusSchema>({
        resolver: zodResolver(SubscribeProductStatusSchema),
    });

    function submit(data: SubscribeProductStatusSchema): void {
        mutate(data);
    }

    const isSubscribed = subscriptions.includes(productId);

    return (
        <Dialog open={isOpen} onOpenChange={setOpen}>
            {
                isSubscribed
                    ? (
                        <TooltipWrapper content={dictionary?.subscriptions.productStatusSubscribed}>
                            <Bell color={twConfig.theme.colors.success} />
                        </TooltipWrapper>
                    )
                    : <DialogTrigger><BellPlus color={twConfig.theme.colors.action} /></DialogTrigger>
            }
            <DialogContent>
                <DialogTitle>
                    {
                        isSubscribed
                            ? dictionary?.form.weGotYourRequest
                            : dictionary?.subscriptions.notifyWhenProductIsAvailable
                    }
                </DialogTitle>
                {
                    isSubscribed
                        ? dictionary?.subscriptions.productStatusSubscriptionsSuccess
                        : (
                            <>
                                <Form {...form}>
                                    <form id='product-notify' onSubmit={form.handleSubmit(submit)}>
                                        <FormField
                                            control={form.control}
                                            name='email'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input {...field} placeholder={dictionary?.profile.yourEmail} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </form>
                                </Form>
                                <DialogFooter>
                                    <DialogClose>{dictionary?.common.cancel}</DialogClose>
                                    <Button
                                        isLoading={isPending}
                                        type='submit'
                                        form='product-notify'
                                    >
                                        {dictionary?.common.save}
                                    </Button>
                                </DialogFooter>
                            </>
                        )
                }
            </DialogContent>
        </Dialog >
    );
};

export default SubscribeProductStatus;
