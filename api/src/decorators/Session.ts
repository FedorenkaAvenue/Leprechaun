// import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// import { Request } from 'express';

// import { UserSession } from '@dto/Session/constructor';
// import { SessionI } from '@interfaces/Session';

// /**
//  * @description get session object
//  * @warning getting and setting the key w'll not change session.
//  *  To CRUD session outside decorator You must get all session object
//  */
// export const Session = createParamDecorator((_: unknown, ctx: ExecutionContext): SessionI => {
//     const req: Request = ctx.switchToHttp().getRequest();

//     // if session has been initialed and doesn't have adition fields
//     if (!req.session.ip) {
//         const { ip, url, session } = req;

//         req.session = Object.assign(
//             session,
//             new UserSession({ ip, url }),
//         );
//     }

//     return req.session;
// });
