// This is a compatibility layer for the svix package
// It provides the same interface as the svix package but works with ES modules

import crypto from 'crypto';

class Webhook {
  constructor(secret) {
    this.secret = secret;
  }

  verify(payload, headers) {
    const signature = headers['svix-signature'];
    const timestamp = headers['svix-timestamp'];
    
    if (!signature || !timestamp) {
      throw new Error('Missing required headers');
    }
    
    const [version, signatureValue] = signature.split(',');
    if (version !== 'v1') {
      throw new Error('Invalid signature version');
    }
    
    const signedPayload = `${timestamp}.${payload}`;
    const expectedSignature = crypto
      .createHmac('sha256', this.secret)
      .update(signedPayload)
      .digest('hex');
    
    if (signatureValue !== expectedSignature) {
      throw new Error('Invalid signature');
    }
    
    // Return the parsed payload
    return JSON.parse(payload);
  }
}

export { Webhook }; 