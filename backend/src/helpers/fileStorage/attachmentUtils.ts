import * as AWS from 'aws-sdk'

const AWSXRay = require('aws-xray-sdk');


const XAWS = AWSXRay.captureAWS(AWS)

// TODO: Implement the fileStogare logic

export class AttachmentAccess {
    constructor(
        private readonly s3: AWS.S3 = new XAWS.S3({
            signatureVersion: 'v4',
            region: process.env.region,
            params: {Bucket: process.env.ATTACHMENT_S3_BUCKET}
            }),
        private readonly signedUrlExpireSeconds = 60 * 5
    ){ }

    async createAttachmentPresignedUrl(todoId: string): Promise<string>{

        const uploadUrl = this.s3.getSignedUrl('putObject', {
            Bucket: process.env.ATTACHMENT_S3_BUCKET,
            Key: `${todoId}.png`,
            Expires: this.signedUrlExpireSeconds
        });        

        return uploadUrl
    }
}