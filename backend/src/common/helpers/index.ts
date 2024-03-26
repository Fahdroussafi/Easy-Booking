import { NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as fs from 'fs';

export const isInt = (value) => {
  value === parseInt(value, 10);
};

export const validateOptionalQueryNumber = (
  value: any,
  defaultValue: number,
): number => {
  if (isNaN(value)) {
    return defaultValue;
  }
  if (!(+value === parseInt(value, 10)) || parseInt(value, 10) < 0) {
    return defaultValue;
  }
  return parseInt(value, 10);
};

export const validateSortValue = (
  value: any,
  availableFields: string[],
  defaultValue: string,
): string => {
  if (!availableFields.includes(value)) {
    return defaultValue;
  }
  return value;
};

export const validateSortDirection = (
  value: any,
  defaultValue: string,
): string => {
  if (!value) {
    return defaultValue;
  }

  if (value !== 'asc' && value !== 'desc') {
    return defaultValue;
  }

  return value;
};

// export const generateInventoryNumber = async (prisma: PrismaService): Promise<string> => {
//   let lastGeneratedInventoryNumber = 0;
//
//   if (await prisma.assets.count() > 0) {
//     const lastAsset = await prisma.assets.findFirst({
//       orderBy: {
//         id: 'desc',
//       },
//     });
//
//     lastGeneratedInventoryNumber = +lastAsset.generatedInventoryNumber;
//   }
//
//   return String(++lastGeneratedInventoryNumber).padStart(8, '0');
// };

export const calculateDepreciation = (
  depreciationPeriod: number,
  assetPrice: number,
  purchaseDate: Date,
): number => {
  if (!depreciationPeriod || !assetPrice || !purchaseDate) {
    return 0;
  }

  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const daysDiff = Math.round(
    (new Date().getTime() - purchaseDate.getTime()) / millisecondsPerDay,
  );
  const depreciationPeriodDays = depreciationPeriod * 360;
  return (daysDiff / depreciationPeriodDays) * assetPrice;
};

export const validateIntValue = (value: string): number => {
  const res = parseInt(value);
  if (isNaN(res)) {
    return null;
  }
  return res;
};

export const validateFloatValue = (value: string): number => {
  const res = +parseFloat(value)?.toFixed(2);
  if (isNaN(res)) {
    return null;
  }
  return res;
};

export const validateBooleanValue = (value: string): boolean => {
  if (typeof value === 'boolean') return value;
  if (value === 'true') {
    return true;
  } else if (value === 'false') {
    return false;
  }
  return null;
};

// export const setAttachmentsPath = async (obj: any) => {
//     if (obj.attachments[0]) {
//         const dirPath = obj.attachments[0].path.split('/');
//         dirPath.pop();
//         dirPath.join('/');
//         const newDirPath = await downloadAttachments(dirPath.join('/'));
//
//         for (const [i, attach] of obj.attachments.entries()) {
//             obj.attachments[i].path = !newDirPath
//                 ? null
//                 : `${newDirPath}/${attach.path.split('/').pop()}`;
//         }
//     }
//
//     return obj;
// };

// I don't know where this is used
export const removeFiles = (files) => {
  for (const key in files) {
    for (const file of files[key]) {
      fs.unlinkSync(`${file.destination}/${file.filename}`);
    }
  }
};

// export async function downloadAttachments(dirPath) {
//     let destFolder = `./attachments/${+new Date()}`;
//
//     try {
//         await sftp
//             .connect({
//                 host: configService.get('SFTP_URL'),
//                 port: configService.get('SFTP_PORT'),
//                 username: configService.get('SFTP_USERNAME'),
//                 password: configService.get('SFTP_PASSWORD'),
//                 readyTimeout: 5000,
//                 retries: 0,
//                 retry_factor: 0,
//                 retry_minTimeout: 0,
//             })
//             .catch((err) => {
//                 console.log(err, 'catch error');
//             });
//
//         sftp.on('download', (info) => {
//             console.log(`Listener: Download ${info.source}`);
//         });
//
//         let rslt = await sftp.downloadDir(dirPath, destFolder);
//         return destFolder;
//     } catch (e) {
//         console.log(e);
//         sftp.end();
//         return null;
//     } finally {
//         sftp.end();
//         // return null;
//     }
//
//     // .then(() => {
//     //     return sftp.fastGet(dirPath, filePath);
//     // })
//     // .then((data) => {
//     //     console.log(data, 'gotten');
//     //     sftp.end();
//     // })
//     // .catch((err) => {
//     //     sftp.end();
//     //     console.error(err.message);
//     // });
// }

export function noneDeletedRecords<
  T extends Prisma.BatchPayload = Prisma.BatchPayload,
>(): Prisma.Middleware {
  return async (
    params: Prisma.MiddlewareParams,
    next: (params: Prisma.MiddlewareParams) => Promise<T>,
  ): Promise<T> => {
    if (
      (params.action === 'findMany' || params.action === 'findFirst') &&
      !params.args?.where?.deleted
    ) {
      if (params.args) {
        if (params.args.where) {
          params.args.where['deleted'] = false;
        } else {
          params.args['where'] = { deleted: false };
        }
      } else {
        params['args'] = {
          where: {
            deleted: false,
          },
        };
      }
    }
    return await next(params);
  };
}

export function softDeleteRecords<
  T extends Prisma.BatchPayload = Prisma.BatchPayload,
>(): Prisma.Middleware {
  return async (
    params: Prisma.MiddlewareParams,
    next: (params: Prisma.MiddlewareParams) => Promise<T>,
  ): Promise<T> => {
    if (params.action == 'delete') {
      // Delete queries
      // Change action to an update
      params.action = 'update';
      params.args['data'] = { deleted: true };
    }
    if (params.action == 'deleteMany') {
      // Delete many queries
      params.action = 'updateMany';
      if (params.args.data != undefined) {
        params.args.data['deleted'] = true;
      } else {
        params.args['data'] = { deleted: true };
      }
    }
    return next(params);
  };
}

export function checkBeforeUpdateOrDelete<
  T extends Prisma.BatchPayload = Prisma.BatchPayload,
>(): Prisma.Middleware {
  return async (
    params: Prisma.MiddlewareParams,
    next: (params: Prisma.MiddlewareParams) => Promise<T>,
  ): Promise<T> => {
    const originalAction = params.action;
    const originalData = params.args?.data;

    if (!(params.action == 'update' || params.action === 'delete')) {
      return next(params);
    }

    // should be using findFirst here because I want to add "deleted = false" to the query
    params.action = 'findUnique';
    delete params.args.data;

    const result = await next(params);

    if (!result || result.count === 0) {
      throw new NotFoundException('no such record');
    } else {
      params.action = originalAction;
      params.args.data = originalData;
    }

    return await next(params);
  };
}


