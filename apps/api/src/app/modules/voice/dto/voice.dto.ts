import { ApiProperty } from '@nestjs/swagger';
import { Voice } from '../voice.entity';

export class PostDto {
    @ApiProperty()
    readonly id: number;

    @ApiProperty()
    readonly authorId: string;

    @ApiProperty()
    readonly authorFirstName: string;

    @ApiProperty()
    readonly authorLastName: string;

    @ApiProperty()
    readonly title: string;

    @ApiProperty()
    readonly content: string;

    @ApiProperty()
    readonly createdAt: Date;

    @ApiProperty()
    readonly updatedAt: Date;

    constructor(voice: Voice) {
        this.id = voice.id;
        this.authorId = voice.userId;
        // this.authorFirstName = voice.user.firstName;
        // this.authorLastName = voice.user.lastName;
        this.title = voice.title;
        this.content = voice.content;
        this.createdAt = voice.createdAt;
        this.updatedAt = voice.updatedAt;
    }
}
