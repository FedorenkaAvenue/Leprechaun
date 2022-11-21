import { Column, Entity, CreateDateColumn, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { SessionI } from '@interfaces/Session';

@Entity('session')
export default class SessionEntity implements SessionI {
    @PrimaryColumn()
    @ApiProperty({ description: 'session ID' })
    sid: string;

    @CreateDateColumn()
    @ApiProperty()
    created_at: Date;

    @Column({ nullable: true, unique: false })
    @ApiProperty()
    expire: Date;

    @Column({ nullable: true, unique: false })
    @ApiProperty()
    sess: string;
}
