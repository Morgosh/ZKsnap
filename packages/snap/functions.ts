import { ethers } from 'ethers';

/**
 * Convert a BigInt value to an address string.
 *
 * @param bigIntValue - The BigInt value.
 * @returns The address string.
 */
export function bigIntToAddress(bigIntValue: bigint): `0x${string}` {
  // Convert BigInt to hexadecimal string
  const hexString = `0x${bigIntValue.toString(16).padStart(40, '0')}`;

  // Use ethers.getAddress to convert and checksum the address `0x${string}`[];
  const addressString = ethers.getAddress(hexString) as `0x${string}`;
  return addressString;
}

/**
 * Get the paymaster name based on the paymaster address.
 *
 * @param paymasterAddress - The request handler args as object.
 * @returns The paymaster name.
 */
export function getPaymasterName(paymasterAddress: `0x${string}`) {
  switch (paymasterAddress.toLowerCase()) {
    case '0xA2Aac7bC9725c36ad9B12D2407dF8de6B2B68359'.toLowerCase():
      return 'Zyfi paymaster'; // They could also have multiple paymasters
    case '0xe63b64AAA3d790C3bBc5563d78Fb75AEfd472C29'.toLowerCase():
      return 'HUE paymaster';
    default:
      return 'Unknown paymaster';
  }
}

const PAYMASTER_FLOW_ABI = new ethers.Interface([
  'function approvalBased(address token, uint256 minimalAllowance, bytes innerInput)',
  'function general(bytes innerInput)',
]);
const approvalBasedSelector =
  PAYMASTER_FLOW_ABI.getFunction('approvalBased')?.selector;
const generalSelector = PAYMASTER_FLOW_ABI.getFunction('general')?.selector;

/**
 * Decode the paymaster input.
 *
 * @param encodedData - The encoded data.
 * @returns The decoded paymaster input.
 */
export function decodePaymasterInput(encodedData: string) {
  // Extract the first 4 bytes (function selector)
  const functionSelector = encodedData.slice(0, 10); // First 4 bytes + '0x'

  if (functionSelector === approvalBasedSelector) {
    // Decode for approvalBased
    const decodedData = PAYMASTER_FLOW_ABI.decodeFunctionData(
      'approvalBased',
      encodedData,
    );
    return {
      type: 'approvalBased',
      token: decodedData.token,
      minimalAllowance: decodedData.minimalAllowance.toString(),
      innerInput: decodedData.innerInput,
    };
  } else if (functionSelector === generalSelector) {
    // Decode for general
    const decodedData = PAYMASTER_FLOW_ABI.decodeFunctionData(
      'general',
      encodedData,
    );
    return {
      type: 'general',
      innerInput: decodedData.innerInput,
    };
  }
  // throw new Error('Unknown function selector');
  return {
    type: 'unknown',
  };
}
