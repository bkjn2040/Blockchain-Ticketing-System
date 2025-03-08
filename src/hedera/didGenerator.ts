/**
 * ticketDID.ts
 *
 * This script demonstrates how to generate a unique DID for a ticket in a Hedera-based system.
 * Each ticket is assigned a unique DID by generating a new ed25519 key pair.
 * The public key is used to construct the DID in the format: did:hedera:<hex-encoded-public-key>
 * A QR code is generated (in SVG format) from the DID using the node-qrcode library.
 *
 * Prerequisites:
 *   - Node.js environment with TypeScript support.
 *   - Install dependencies: npm install @types/node qrcode
 *
 * Instructions to verify the DID later on:
 *   1. When a ticket is purchased, store the ticket DID (and its associated public key) on the Hedera network
 *      as part of the ticket’s metadata or a DID document.
 *   2. When verifying the ticket (e.g., at event entry), scan the QR code to obtain the DID.
 *   3. Use the Hedera Hashgraph SDK or a dedicated DID resolver for Hedera to retrieve the stored DID document.
 *   4. Compare the public key in the DID document with the expected public key.
 *   5. Optionally, verify a digital signature (if your ticket issuance includes signing) using that public key.
 */

import { generateKeyPairSync, KeyObject } from 'crypto';
import QRCode from 'qrcode';

/**
 * Generates a unique DID for a ticket by creating an ed25519 key pair.
 * The public key is exported and hex-encoded, then used to form the DID string.
 * A QR code is generated (in SVG format) from the DID.
 *
 * @returns An object containing the DID, the QR code as an SVG string, and the key pair details.
 */
async function generateTicketDID(): Promise<{ did: string, qrCodeSvg: string, publicKeyHex: string, privateKey: KeyObject }> {
  // Generate an ed25519 key pair
  const { publicKey, privateKey } = generateKeyPairSync('ed25519');

  // Export the public key in DER format and convert to a hex string.
  const publicKeyDer = publicKey.export({ type: 'spki', format: 'der' }) as Buffer;
  const publicKeyHex = publicKeyDer.toString('hex');

  // Construct the DID using the public key hex.
  const did = `did:hedera:${publicKeyHex}`;

  // Generate a QR code (SVG format) from the DID using the node-qrcode library.
  const qrCodeSvg = await QRCode.toString(did, { type: 'svg' });

  return { did, qrCodeSvg, publicKeyHex, privateKey };
}

/**
 * A simple function to verify that a ticket DID is in the expected format.
 * It checks that the DID starts with "did:hedera:" and that the remaining part is a valid hex string.
 *
 * @param did - The DID string to check.
 * @returns True if the format is valid, false otherwise.
 */
function verifyTicketDIDFormat(did: string): boolean {
  if (!did.startsWith("did:hedera:")) return false;
  const publicKeyHex = did.substring("did:hedera:".length);
  return /^[0-9a-fA-F]+$/.test(publicKeyHex);
}

// Example usage:
(async () => {
  const ticket = await generateTicketDID();
  console.log("Ticket DID:", ticket.did);
  console.log("QR Code SVG:\n", ticket.qrCodeSvg);

  // Verification example:
  const isValid = verifyTicketDIDFormat(ticket.did);
  console.log("Is the ticket DID format valid?", isValid);
})();

/*
 * -----------------------------
 * Instructions for verifying the DID later on:
 *
 * 1. When a ticket is purchased, register the generated DID along with its public key on the Hedera network.
 *    This can be done by storing a DID document that contains the public key and any other relevant metadata.
 *
 * 2. At verification time (for example, at an event entrance), scan the QR code to retrieve the DID string.
 *
 * 3. Use the Hedera Hashgraph SDK or a dedicated DID resolver to fetch the stored DID document from the network.
 *
 * 4. Compare the public key within the DID document to the public key that you have on record for that ticket.
 *
 * 5. If your ticket includes a digital signature, use the public key to verify the signature.
 *
 * Note:
 * - The QR code is generated as an SVG string and can be embedded in webpages or printed on physical tickets.
 * - Always ensure secure management of private keys and proper registration of the public keys on the Hedera network.
 */
