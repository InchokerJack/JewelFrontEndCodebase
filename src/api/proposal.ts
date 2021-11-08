/* eslint-disable @typescript-eslint/no-explicit-any */
import { DATA_DUMMY, ProposalDataType } from 'src/constants';

export const getProposal = (): ProposalDataType[] => {
  try {
    // TODO: neu server ma duoc thi mo comment
    // const { data } = await axios.get('/proposal');

    const { data } = DATA_DUMMY;
    return data;
  } catch (err: any) {
    throw err;
  }
};
