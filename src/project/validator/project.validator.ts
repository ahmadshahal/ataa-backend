import { FileTypeValidator, MaxFileSizeValidator } from "@nestjs/common";

export const ProjectImageValidator = [
    new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
    new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
]