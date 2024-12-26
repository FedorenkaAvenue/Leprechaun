import { Copy, Share2 } from "lucide-react";
import { FC, useState } from "react";

import Dialog from "./Dialog";
import { Button } from "./Button";
import { Label } from "./Form";
import InputText from "./Input";
import { useI18n } from "@shared/lib/i18n_client";

interface Props {
    link: string
}

const Share: FC<Props> = ({ link }) => {
    const [isCopied, setCopied] = useState<boolean>(false);
    const { dictionary, lang } = useI18n();

    const href = `${window.location.origin}/${lang}/${link}`;

    function copyLink() {
        try {
            navigator.clipboard.writeText(href);
            setCopied(true);
        } catch (err) {
            alert('clipboard is disabled')
        }
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild><Share2 /></Dialog.Trigger>
            <Dialog.Content className="sm:max-w-md">
                <Dialog.Header>
                    <Dialog.Title>{dictionary?.share.share}</Dialog.Title>
                    {!isCopied && <Dialog.Description>{dictionary?.share.shareDescription}</Dialog.Description>}
                </Dialog.Header>
                {isCopied
                    ? <div>{dictionary?.share.linkCopied}</div>
                    : (
                        <div className="flex items-center space-x-2">
                            <div className="grid flex-1 gap-2">
                                <Label htmlFor="link" className="sr-only">{dictionary?.common.link}</Label>
                                <InputText id="link" defaultValue={href} readOnly />
                            </div>
                            <Button onClick={copyLink} type="submit" size="sm" className="px-3">
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
