import { ApiProperty } from "@nestjs/swagger";

import { SubscriptionProductStatus } from "@gen/subscription";

export class SubscriptionProductStatusSchema implements Omit<SubscriptionProductStatus, 'user' | 'queries'> {
    @ApiProperty({ required: true })
    product: string;

    @ApiProperty({ required: true })
    email: string;
}
