export interface RunRequest {
  code: string;
  testCode?: string;
  stdin?: string;
}

export interface TestResult {
  name: string;
  passed: boolean;
  message?: string;
}

export interface RunResult {
  stdout: string;
  error?: {
    type: string;
    message: string;
    friendly: string;
  };
  tests?: TestResult[];
  timedOut?: boolean;
}
