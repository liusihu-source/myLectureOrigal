# Python爬虫

## 依赖库

- request（请求网页）
- re
- json
- BeautifulSoup
- tqdm（进度条）



## 个人笔记

- 见云盘



## 实例

```python
import requests
import re
import json
from bs4 import BeautifulSoup
from tqdm import tqdm

class CoronaVirusSpider(object):

    #load、save、get_content_from_url、parse_corona_virus是工具函数，都会用到，所以都放到上边
    def __init__(self):
        self.home_url = 'https://ncov.dxy.cn/ncovh5/view/pneumonia'

    def load(self,path):
        with open(path,encoding='utf-8') as fp:
            data = json.load(fp)
        return data

    def save(self,data,path):
        with open(path,'w',encoding='utf-8') as fp:
            json.dump(data,fp,ensure_ascii=False)

    def get_content_from_url(self,url):
        response = requests.get(url)
        return response.content.decode()

    def parse_corona_virus(self,last_day_corona_virus_of_china,desc):
        corona_virus = []
        for country in tqdm(last_day_corona_virus_of_china,desc):
            statistics_data_url = country['statisticsData']
            statistics_data_json_str = self.get_content_from_url(statistics_data_url)
            statistics_data = json.loads(statistics_data_json_str)['data']
            for one_day in statistics_data:
                one_day['provinceName'] = country['provinceName']
                if country.get('countryShortCode'):
                    one_day['countryShortCode'] = country['countryShortCode']
            corona_virus.extend(statistics_data)
        return corona_virus

    #parse_home_page、crawl_last_day_corona_virus这两个函数是提取爬取好全国数据，之后放到文件中提供给
    #crawl_corona_virus、parse_corona_virus函数用于读取和解析全球疫情数据
    def parse_home_page(self,home_page,tag_id):
        soup = BeautifulSoup(home_page,'lxml')
        script = soup.find(id = tag_id)
        json_str = re.findall(r'\[.+\]',str(script))[0]
        data = json.loads(json_str)
        return data

    def crawl_last_day_corona_virus(self):
        home_page = self.get_content_from_url(self.home_url)
        last_day_corona_virus = self.parse_home_page(home_page,tag_id='getListByCountryTypeService2true')
        self.save(last_day_corona_virus,'last_day_corona_virus.json')

    def crawl_corona_virus(self):
        last_day_corona_virus = self.load('last_day_corona_virus.json')
        corona_virus = self.parse_corona_virus(last_day_corona_virus,desc='采集1月25以来各国疫情数据')
        self.save(corona_virus,'corona_virus.json')

    #crawl_last_corona_virus_of_china提前爬取好全国数据，
    #供crawl_corona_virus_of_china、parse_corona_virus函数读取和解析使用
    def crawl_last_corona_virus_of_china(self):
        home_page = self.get_content_from_url(self.home_url)
        soup = BeautifulSoup(home_page,'lxml')
        script = soup.find(id = 'getAreaStat')
        json_str = re.findall(r'\[.+\]',str(script))[0]
        data = json.loads(json_str)
        self.save(data,'last_corona_virus_of_china.json')

    def crawl_corona_virus_of_china(self):
        last_day_corona_virus_of_china = self.load('last_day_corona_virus_of_china.json')
        corona_virus = self.parse_corona_virus(last_day_corona_virus_of_china,'采集1月25日以来国内各省的疫情数据')
        self.save(corona_virus,'corona_virus_of_china.json')

    #类CoronaVirusSpider的开始部分
    def run(self):
        self.crawl_corona_virus()  #爬取最近一日全球的疫情数据
        self.crawl_corona_virus_of_china()   #爬取最近一日全国的疫情数据
        # self.crawl_last_corona_virus_of_china()

if __name__=='__main__':
   spider = CoronaVirusSpider()
   spider.run()
```

