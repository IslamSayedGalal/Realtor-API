import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserType } from '@prisma/client';

interface SignupParams {
  email: string;
  password: string;
  name: string;
  phone: string;
}

interface SigninParams {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}
  async signup(
    { email, name, phone, password }: SignupParams,
    userType: UserType,
  ) {
    const userExists = this.prismaService.user.findUnique({
      where: { email },
    });
    if (userExists) {
      throw new ConflictException();
    }

    console.log('userExists', userExists);

    const hashedPassword = bcrypt.hashSync(password, 10);
    console.log(hashedPassword);

    const user = this.prismaService.user.create({
      data: {
        email,
        name,
        phone,
        password: hashedPassword,
        user_type: userType,
      },
    });

    const token = await this.generateJWT(name, (await user).id);
    return { user, token };
  }

  async signin({ email, password }: SigninParams) {
    const user = this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new HttpException('Invalid credentials', 400);
    }

    const hasedPassword = (await user).password;
    const isValidPassword = bcrypt.compare(password, hasedPassword);
    if (!isValidPassword) {
      throw new HttpException('Invalid credentials', 400);
    }

    const token = await this.generateJWT((await user).name, (await user).id);
    return { user, token };
  }

  private generateJWT(name: string, id: number) {
    return jwt.sign(
      {
        name,
        id,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '1d',
      },
    );
  }

  generateProductKey(email: string, userType: UserType) {
    const string = `${email}-${userType}-${process.env.PRODUCT_SECRET_KEY}`;

    return bcrypt.hash(string, 10);
  }
}
