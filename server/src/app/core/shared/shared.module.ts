import { Module, Shared } from '@nestjs/common';

@Shared()
@Module({
    components: [],
    exports: [],
})
export class SharedModule { }
