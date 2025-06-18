import authRepository from './auth.repository';
import api from '@/lib/api';

jest.mock('@/lib/api', () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
    get: jest.fn(),
  }
}));

describe('AuthRepository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should login and return sessionId', async () => {
    const mockResponse = {
      data: {
        data: {
          phone_number: '628123456789',
          sessionId: 'session-id'
        }
      }
    };

    const mockedPost = api.post as jest.Mock;
    mockedPost.mockResolvedValue(mockResponse);

    const result = await authRepository.login('+628123456789', 'testing');

    expect(api.post).toHaveBeenCalledWith('/user/request-otp', {
      phone_number: '+628123456789',
      password: 'testing'
    });

    expect(result).toEqual({
      phone_number: '628123456789',
      sessionId: 'session-id'
    });
  });
});
