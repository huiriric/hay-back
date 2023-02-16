import { ApiProperty } from '@nestjs/swagger';

export class CoreOutput {
    @ApiProperty({ type: String, description: '에러 메세지' })
    error?: string;

    @ApiProperty({
        type: Boolean,
        description: 'Response: true-성공 false-실패',
    })
    ok: boolean;
}
