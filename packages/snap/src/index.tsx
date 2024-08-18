import type { SignTypedDataV4Signature } from '@metamask/snaps-sdk';
import { SeverityLevel, type OnSignatureHandler } from '@metamask/snaps-sdk';
import { Box, Text, Address, Heading, Row } from '@metamask/snaps-sdk/jsx';
import { ethers } from 'ethers';

import {
  bigIntToAddress,
  decodePaymasterInput,
  getPaymasterName,
} from '../functions';

export const onSignature: OnSignatureHandler = async ({
  signature,
  signatureOrigin,
}) => {
  try {
    console.log(signatureOrigin);
    const signatureV4 = signature as SignTypedDataV4Signature;
    const paymasterDetails = decodePaymasterInput(
      signatureV4.data.message.paymasterInput,
    );
    // const testAddress = paymasterDetails.token as `0x${string}`;
    // return {
    //   content: (
    //     <Box>
    //       <Row label="Signature">
    //         <Text>{JSON.stringify(signatureV4)}</Text>
    //       </Row>
    //     </Box>
    //   ),
    //   severity: SeverityLevel.Critical,
    // };
    return {
      content: (
        <Box>
          <Heading>Signature Insights</Heading>
          <Row label="From">
            <Address
              address={bigIntToAddress(BigInt(signatureV4.data.message.from))}
            ></Address>
          </Row>
          <Row label="To">
            <Address
              address={bigIntToAddress(BigInt(signatureV4.data.message.to))}
            ></Address>
          </Row>
          <Row label="Value">
            <Text>
              {`${ethers
                .formatEther(signatureV4.data.message.value)
                .toString()} ETH`}
            </Text>
          </Row>
          <Row label="Transaction Type">
            <Text>{paymasterDetails.type}</Text>
          </Row>
          <Row label="Paymaster">
            <Text>
              {getPaymasterName(
                bigIntToAddress(BigInt(signatureV4.data.message.paymaster)),
              )}
            </Text>
          </Row>
          <Row label="Paymaster address">
            <Address
              address={bigIntToAddress(
                BigInt(signatureV4.data.message.paymaster),
              )}
            ></Address>
          </Row>
          {paymasterDetails?.type === 'approvalBased' && (
            <Row label="Token">
              <Address address={paymasterDetails.token}></Address>
            </Row>
          )}
          {paymasterDetails?.type === 'approvalBased' && (
            <Row label="Approval amount">
              <Text>
                {ethers
                  .formatEther(paymasterDetails.minimalAllowance)
                  .slice(0, 7)
                  .toString()}
              </Text>
            </Row>
          )}
        </Box>
      ),
      severity: SeverityLevel.Critical,
    };
  } catch (error: any) {
    return {
      content: (
        <Box>
          <Text>Error</Text>
          <Text>An error occurred while processing the signature.</Text>
          <Text>{error.message}</Text>
        </Box>
      ),
      severity: SeverityLevel.Critical,
    };
  }
};

// /**
//  * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
//  *
//  * @param args - The request handler args as object.
//  * @param args.origin - The origin of the request, e.g., the website that
//  * invoked the snap.
//  * @param args.request - A validated JSON-RPC request object.
//  * @returns The result of `snap_dialog`.
//  * @throws If the request method is not valid for this snap.
//  */
// export const onRpcRequest: OnRpcRequestHandler = async ({
//   origin,
//   request,
// }) => {
//   switch (request.method) {
//     case 'hello':
//       return snap.request({
//         method: 'snap_dialog',
//         params: {
//           type: 'confirmation',
//           content: (
//             <Box>
//               <Text>
//                 Hello, <Bold>{origin}</Bold>!
//               </Text>
//               <Text>
//                 This custom confirmation is just for display purposes.
//               </Text>
//               <Text>
//                 But you can edit the snap source code to make it do something,
//                 if you want to!
//               </Text>
//             </Box>
//           ),
//         },
//       });
//     default:
//       throw new Error('Method not found.');
//   }
// };
