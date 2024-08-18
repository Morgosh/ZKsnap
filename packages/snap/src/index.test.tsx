import { expect } from '@jest/globals';
import { installSnap } from '@metamask/snaps-jest';
import { Box, Text, Heading, Row, Address } from '@metamask/snaps-sdk/jsx';

describe('tests', () => {
  // describe('hello', () => {
  //   it('shows a confirmation dialog', async () => {
  //     const { request } = await installSnap();

  //     const origin = 'Jest';
  //     const response = request({
  //       method: 'hello',
  //       origin,
  //     });

  //     const ui = await response.getInterface();
  //     expect(ui.type).toBe('confirmation');
  //     expect(ui).toRender(
  //       <Box>
  //         <Text>
  //           Hello, <Bold>{origin}</Bold>!
  //         </Text>
  //         <Text>This custom confirmation is just for display purposes.</Text>
  //         <Text>
  //           But you can edit the snap source code to make it do something, if
  //           you want to!
  //         </Text>
  //       </Box>,
  //     );

  //     await ui.ok();

  //     expect(await response).toRespondWith(true);
  //   });
  // });

  // it('throws an error if the requested method does not exist', async () => {
  //   const { request } = await installSnap();

  //   const response = await request({
  //     method: 'foo',
  //   });

  //   expect(response).toRespondWithError({
  //     code: -32603,
  //     message: 'Method not found.',
  //     stack: expect.any(String),
  //   });
  // });

  it('general onSignature test', async () => {
    const { onSignature } = await installSnap();

    const signatureForHue = {
      from: '0x52c12c0f38051f287dfce3c49b84a08f0139db9b',
      data: {
        types: {
          Transaction: [
            {
              name: 'txType',
              type: 'uint256',
            },
            {
              name: 'from',
              type: 'uint256',
            },
            {
              name: 'to',
              type: 'uint256',
            },
            {
              name: 'gasLimit',
              type: 'uint256',
            },
            {
              name: 'gasPerPubdataByteLimit',
              type: 'uint256',
            },
            {
              name: 'maxFeePerGas',
              type: 'uint256',
            },
            {
              name: 'maxPriorityFeePerGas',
              type: 'uint256',
            },
            {
              name: 'paymaster',
              type: 'uint256',
            },
            {
              name: 'nonce',
              type: 'uint256',
            },
            {
              name: 'value',
              type: 'uint256',
            },
            {
              name: 'data',
              type: 'bytes',
            },
            {
              name: 'factoryDeps',
              type: 'bytes32[]',
            },
            {
              name: 'paymasterInput',
              type: 'bytes',
            },
          ],
          EIP712Domain: [
            {
              name: 'name',
              type: 'string',
            },
            {
              name: 'version',
              type: 'string',
            },
            {
              name: 'chainId',
              type: 'uint256',
            },
          ],
        },
        domain: {
          name: 'zkSync',
          version: '2',
          chainId: '0x144',
        },
        primaryType: 'Transaction',
        message: {
          txType: '113',
          from: '472445125150151113729427122939535983689770589083',
          to: '642114253366208016084585373990645857043264199736',
          gasLimit: '6000000',
          gasPerPubdataByteLimit: '50000',
          maxFeePerGas: '45250000',
          maxPriorityFeePerGas: '45250000',
          paymaster: '1314392390550575393235290304261338998132384934953',
          nonce: '16',
          value: '1000000000000',
          data: '0x018eeaa50000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000000000000000000000000000062d8b1c7fe0c8a6d3a8a8ac051c24a06b4602e6500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000abf1fe6636b9271ac4c59a8193ab31589e512d5a0000000000000000000000000000000000000000000000000000000000000fb90000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e8d4a5100000000000000000000000000062d8b1c7fe0c8a6d3a8a8ac051c24a06b4602e6500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000066b8ac430000000000000000000000000000000000000000000000000000000067ab4e530000000000000000000000000000000000000000000000000000000066b8ac4300000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000041e72ba7eb6615f3b4cd421b1f53f45fbe10ac7850d2bb7856c113872b26c4b60f54461b3599221f16eaaefe94a691b2882824453e00229bec40a779de6c1a6acb1c00000000000000000000000000000000000000000000000000000000000000',
          factoryDeps: [],
          paymasterInput:
            '0x8c5a344500000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000',
        },
      },
      signatureMethod: 'eth_signTypedData_v4',
    } as any;

    const response = await onSignature(signatureForHue);

    const ui = response.getInterface() as any;

    // we don't use any functions here to make sure the test is not dependent on the implementation
    expect(ui).toRender(
      <Box>
        <Heading>Signature Insights</Heading>
        <Row label="From">
          <Address
            address={'0x52c12c0f38051F287dFCe3C49B84a08f0139DB9b' as any}
          ></Address>
        </Row>
        <Row label="To">
          <Address
            address={'0x70796621893f3f667601Cdf014592Ac2D44a5C38' as any}
          ></Address>
        </Row>
        <Row label="Value">
          <Text>0.000001 ETH</Text>
        </Row>
        <Row label="Transaction Type">
          <Text>general</Text>
        </Row>
        <Row label="Paymaster">
          <Text>HUE paymaster</Text>
        </Row>
        <Row label="Paymaster address">
          <Address
            address={'0xe63b64AAA3d790C3bBc5563d78Fb75AEfd472C29' as any}
          ></Address>
        </Row>
        {signatureForHue.from === 'never' && ( // this is never rendered, but has to be here in order to pass the test
          <Row label="Token">
            <Address address={signatureForHue.token}></Address>
          </Row>
        )}
        {signatureForHue.from === 'never' && ( // this is never rendered, but has to be here in order to pass the test
          <Row label="Token">
            <Address address={signatureForHue.token}></Address>
          </Row>
        )}
      </Box>,
    );
  });

  it('approvalBased onSignature test', async () => {
    const { onSignature } = await installSnap();

    const signatureExampleForZyfi = {
      from: '0x52c12c0f38051f287dfce3c49b84a08f0139db9b',
      data: {
        types: {
          Transaction: [
            {
              name: 'txType',
              type: 'uint256',
            },
            {
              name: 'from',
              type: 'uint256',
            },
            {
              name: 'to',
              type: 'uint256',
            },
            {
              name: 'gasLimit',
              type: 'uint256',
            },
            {
              name: 'gasPerPubdataByteLimit',
              type: 'uint256',
            },
            {
              name: 'maxFeePerGas',
              type: 'uint256',
            },
            {
              name: 'maxPriorityFeePerGas',
              type: 'uint256',
            },
            {
              name: 'paymaster',
              type: 'uint256',
            },
            {
              name: 'nonce',
              type: 'uint256',
            },
            {
              name: 'value',
              type: 'uint256',
            },
            {
              name: 'data',
              type: 'bytes',
            },
            {
              name: 'factoryDeps',
              type: 'bytes32[]',
            },
            {
              name: 'paymasterInput',
              type: 'bytes',
            },
          ],
          EIP712Domain: [
            {
              name: 'name',
              type: 'string',
            },
            {
              name: 'version',
              type: 'string',
            },
            {
              name: 'chainId',
              type: 'uint256',
            },
          ],
        },
        domain: {
          name: 'zkSync',
          version: '2',
          chainId: '0x144',
        },
        primaryType: 'Transaction',
        message: {
          txType: '113',
          from: '472445125150151113729427122939535983689770589083',
          to: '642114253366208016084585373990645857043264199736',
          gasLimit: '697173',
          gasPerPubdataByteLimit: '50000',
          maxFeePerGas: '45250000',
          maxPriorityFeePerGas: '45250000',
          paymaster: '928665031076107116168062653770978733265228563289',
          nonce: '22',
          value: '1000000000000',
          data: '0x018eeaa50000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000000000000000000000000000062d8b1c7fe0c8a6d3a8a8ac051c24a06b4602e6500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000abf1fe6636b9271ac4c59a8193ab31589e512d5a00000000000000000000000000000000000000000000000000000000000015770000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e8d4a5100000000000000000000000000062d8b1c7fe0c8a6d3a8a8ac051c24a06b4602e6500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000066be1a4e0000000000000000000000000000000000000000000000000000000067b0bc5e0000000000000000000000000000000000000000000000000000000066be1a4e00000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000041e4a7a43f1fe527a307eda2091c9133616e72e489f2b6c2a557fb09496476486d215652be4e4294cedc4104b97d8601bb896f8caf8e465ccf6753432c2247dfbd1b00000000000000000000000000000000000000000000000000000000000000',
          factoryDeps: [],
          paymasterInput:
            '0x949431dc0000000000000000000000005a7d6b2f92c77fad6ccabd7ee0624e64907eaf3e000000000000000000000000000000000000000000000000008ba6d948fa2f4d000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000019160f863bb00000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000041d5ab33d05a756e579219e39ce9e9e817239ea00598a79f0b2a4dc0c61239427a4ac815bbaa3088b22dc2e459d0d39374c5a2fdfa193e8e49c4f83d259cf21d831b00000000000000000000000000000000000000000000000000000000000000',
        },
      },
      signatureMethod: 'eth_signTypedData_v4',
    } as any;

    const response = await onSignature(signatureExampleForZyfi);

    const ui = response.getInterface() as any;

    // we don't use any functions here to make sure the test is not dependent on the implementation
    expect(ui).toRender(
      <Box>
        <Heading>Signature Insights</Heading>
        <Row label="From">
          <Address
            address={'0x52c12c0f38051F287dFCe3C49B84a08f0139DB9b' as any}
          ></Address>
        </Row>
        <Row label="To">
          <Address
            address={'0x70796621893f3f667601Cdf014592Ac2D44a5C38' as any}
          ></Address>
        </Row>
        <Row label="Value">
          <Text>0.000001 ETH</Text>
        </Row>
        <Row label="Transaction Type">
          <Text>approvalBased</Text>
        </Row>
        <Row label="Paymaster">
          <Text>Zyfi paymaster</Text>
        </Row>
        <Row label="Paymaster address">
          <Address
            address={'0xA2Aac7bC9725c36ad9B12D2407dF8de6B2B68359' as any}
          ></Address>
        </Row>
        <Row label="Token">
          <Address
            address={'0x5A7d6b2F92C77FAD6CCaBd7EE0624E64907Eaf3E' as any}
          ></Address>
        </Row>
        <Row label="Approval amount">
          <Text>0.03930</Text>
        </Row>
      </Box>,
    );
  });
});
