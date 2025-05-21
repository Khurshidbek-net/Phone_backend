import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '../../generated/prisma';

@Injectable()
export class MailService {
  constructor(private mailService: MailerService) {}

  async sendMail(user: User, email: string) {
    const url = `${process.env.BASE_URL}/api/user/activate/${user.activation_link}`;
    console.log(url);
    await this.mailService.sendMail({
      to: email,
      subject: 'Phono ga xush kelibsiz',
      template: './confirm',
      context: {
        name: `${user.firstName}`,
        url,
      },
    });
  }
}
