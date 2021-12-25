export interface PublicKeyProps {
  name: string;
  expectedLen: number;
  specialStrList: string[];
  isContainCaptial: boolean;
  isCaptialFirst: boolean;
  desc?: string;
}

class PublicKey {
  name: string;
  expectedLen: number;
  specialStrList: string[];
  isContainCaptial: boolean;
  isCaptialFirst: boolean;
  desc?: string;

  constructor(props: PublicKeyProps) {
    this.name = props.name;
    this.expectedLen = props.expectedLen;
    this.specialStrList = props.specialStrList;
    this.isContainCaptial = props.isContainCaptial;
    this.isCaptialFirst = props.isCaptialFirst;
    this.desc = props.desc;
  }
}

export default PublicKey;
