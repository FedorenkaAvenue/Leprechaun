'use client';

import { Copy, Share2 } from "lucide-react";
import { FC } from "react";

import Dialog from "./Dialog";
import { Button } from "./Button";
import { Label } from "./Form";
import InputText from "./Input";
import { useI18n } from "@shared/lib/i18n_client";
import { useCopyToClipboard } from "@uidotdev/usehooks";

interface Props {
    link: string
}

const Share: FC<Props> = ({ link }) => {
    const [val, copy] = useCopyToClipboard();
    const { dictionary, lang } = useI18n();

    const href = `${window.location.origin}/${lang}/${link}`;

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild><Share2 /></Dialog.Trigger>
            <Dialog.Content className="sm:max-w-md">
                <Dialog.Header>
                    <Dialog.Title>{dictionary?.share.share}</Dialog.Title>
                    {!val && <Dialog.Description>{dictionary?.share.shareDescription}</Dialog.Description>}
                </Dialog.Header>
                {val
                    ? <div>{dictionary?.share.linkCopied}</div>
                    : (
                        <div className="flex items-center space-x-2">
                            <div className="grid flex-1 gap-2">
                                <Label htmlFor="link" className="sr-only">{dictionary?.common.link}</Label>
                                <InputText id="link" defaultValue={href} readOnly />
                            </div>
                            <Button onClick={() => copy(href)} type="submit" size="sm" className="px-3">
                                <Copy />
                            </Button>
                        </div>
                    )
                }
            </Dialog.Content>
        </Dialog.Root>
    );
};

export default Share;
