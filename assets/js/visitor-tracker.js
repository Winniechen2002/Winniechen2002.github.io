/**
 * 访客地图数据处理
 * 这个文件提供了从各种数据源获取访客地理位置数据的函数
 */

class VisitorTracker {
  constructor(options = {}) {
    this.options = Object.assign({
      // 默认配置
      useGoogleAnalytics: false,
      useCustomApi: false,
      apiEndpoint: '/api/visitors',
      mockData: true,
      refreshInterval: 3600000 // 1小时刷新一次
    }, options);
    
    this.visitorData = [];
    this.statistics = {
      total: 0,
      countries: 0,
      today: 0
    };
  }
  
  /**
   * 初始化访客跟踪器
   */
  async init() {
    if (this.options.mockData) {
      await this._loadMockData();
    } else if (this.options.useGoogleAnalytics) {
      await this._loadGoogleAnalyticsData();
    } else if (this.options.useCustomApi) {
      await this._loadCustomApiData();
    }
    
    // 定期刷新数据
    if (this.options.refreshInterval > 0) {
      setInterval(() => this.refresh(), this.options.refreshInterval);
    }
    
    return {
      visitorData: this.visitorData,
      statistics: this.statistics
    };
  }
  
  /**
   * 刷新访客数据
   */
  async refresh() {
    if (this.options.mockData) {
      await this._loadMockData();
    } else if (this.options.useGoogleAnalytics) {
      await this._loadGoogleAnalyticsData();
    } else if (this.options.useCustomApi) {
      await this._loadCustomApiData();
    }
    
    // 触发数据更新事件
    const event = new CustomEvent('visitordata-updated', {
      detail: {
        visitorData: this.visitorData,
        statistics: this.statistics
      }
    });
    document.dispatchEvent(event);
    
    return {
      visitorData: this.visitorData,
      statistics: this.statistics
    };
  }
  
  /**
   * 从Google Analytics加载数据
   * 需要先设置GA并授权
   */
  async _loadGoogleAnalyticsData() {
    // 这里应该实现从GA加载数据的逻辑
    // 需要GA账号和授权配置
    console.log('Google Analytics integration not configured');
    
    // 使用模拟数据
    await this._loadMockData();
  }
  
  /**
   * 从自定义API加载数据
   */
  async _loadCustomApiData() {
    try {
      const response = await fetch(this.options.apiEndpoint);
      if (response.ok) {
        const data = await response.json();
        this.visitorData = data.visitors || [];
        
        // 计算统计数据
        this._calculateStatistics();
      } else {
        console.error('Failed to load visitor data from API');
        await this._loadMockData();
      }
    } catch (error) {
      console.error('Error loading visitor data:', error);
      await this._loadMockData();
    }
  }
  
  /**
   * 加载模拟数据
   */
  async _loadMockData() {
    // 模拟数据，仅用于演示
    this.visitorData = [
      { lat: 40.7128, lng: -74.0060, country: '美国', visits: 254, size: 0.5, color: 'red' },
      { lat: 35.6762, lng: 139.6503, country: '日本', visits: 153, size: 0.4, color: 'orange' },
      { lat: 22.3193, lng: 114.1694, country: '中国香港', visits: 123, size: 0.4, color: 'blue' },
      { lat: 39.9042, lng: 116.4074, country: '中国', visits: 421, size: 0.7, color: 'gold' },
      { lat: 51.5074, lng: -0.1278, country: '英国', visits: 112, size: 0.3, color: 'green' },
      { lat: 48.8566, lng: 2.3522, country: '法国', visits: 76, size: 0.3, color: 'purple' },
      { lat: 55.7558, lng: 37.6173, country: '俄罗斯', visits: 65, size: 0.2, color: 'cyan' },
      { lat: -33.8688, lng: 151.2093, country: '澳大利亚', visits: 45, size: 0.2, color: 'yellow' },
      { lat: 37.7749, lng: -122.4194, country: '美国(旧金山)', visits: 89, size: 0.3, color: 'red' },
      { lat: 1.3521, lng: 103.8198, country: '新加坡', visits: 42, size: 0.2, color: 'pink' }
    ];
    
    // 随机添加一些今日访问量
    const randomToday = Math.floor(Math.random() * 50) + 10;
    const randomCountries = this.visitorData.length - Math.floor(Math.random() * 3);
    
    // 计算统计数据
    this._calculateStatistics(randomToday, randomCountries);
    
    return {
      visitorData: this.visitorData,
      statistics: this.statistics
    };
  }
  
  /**
   * 计算统计数据
   */
  _calculateStatistics(todayVisits = null, countryCount = null) {
    // 总访问量
    this.statistics.total = this.visitorData.reduce((sum, item) => sum + item.visits, 0);
    
    // 国家/地区数量
    this.statistics.countries = countryCount || this.visitorData.length;
    
    // 今日访问量
    this.statistics.today = todayVisits || Math.floor(Math.random() * 50) + 5;
  }
}

// 导出访客跟踪器
window.VisitorTracker = VisitorTracker; 