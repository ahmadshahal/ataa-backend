"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const argon2 = require("argon2");
const library_1 = require("@prisma/client/runtime/library");
let AuthService = class AuthService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async login(loginDto) {
        const user = await this.prismaService.user.findUnique({
            where: {
                email: loginDto.email,
            },
        });
        if (!user) {
            throw new common_1.ForbiddenException('Credentials Incorrect');
        }
        const passwordsMatch = await argon2.verify(user.password, loginDto.password);
        if (!passwordsMatch) {
            throw new common_1.ForbiddenException('Wrong Password');
        }
        return user;
    }
    async signup(signupDto) {
        const hashedPassword = await argon2.hash(signupDto.password);
        try {
            const user = await this.prismaService.user.create({
                data: {
                    email: signupDto.email,
                    password: hashedPassword,
                    phonenumber: signupDto.phoneNumber,
                    name: signupDto.email,
                },
            });
            return user;
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.ForbiddenException('Credentials Taken');
                }
            }
            throw error;
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map