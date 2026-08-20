/**
 * Banner & Promotion Service
 */

import { Banner, Promotion } from '../models';
import { MOCK_HERO_BANNERS, MOCK_PROMOTIONS } from '../mocks/banners.mock';

class BannerService {
  public async getHeroBanners(): Promise<Banner[]> {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return [...MOCK_HERO_BANNERS];
  }

  public async getPromotions(): Promise<Promotion[]> {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return [...MOCK_PROMOTIONS];
  }
}

export const bannerService = new BannerService();
