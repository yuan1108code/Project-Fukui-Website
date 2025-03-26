import React, { useState, useEffect } from 'react';
import { Send, User, Bot, Sun, Wind, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const OutdoorActivityAdvisor = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // 環境指標權重數據
  const indicatorData = [
    { name: 'PM2.5', value: 85, maxValue: 150, color: '#ff7f50' },
    { name: '紫外線', value: 7, maxValue: 10, color: '#ff5252' },
    { name: '風速', value: 3, maxValue: 10, color: '#4fc3f7' }
  ];

  // 將原始數據轉換為百分比
  const pieData = indicatorData.map(item => ({
    name: item.name,
    value: (item.value / item.maxValue) * 100
  }));

  // 自動展示預設對話
  useEffect(() => {
    const mockQuery = "今天適合帶孩子去公園嗎？";
    setInput(mockQuery);
    setTimeout(() => {
      const newMessages = [
        { role: 'user', content: mockQuery },
        {
          role: 'assistant',
          content: [
            {
              type: 'text',
              content: '根據當前環境指標分析：'
            },
            {
              type: 'indicators',
              data: indicatorData
            },
            {
              type: 'warning',
              content: '目前 PM2.5 指數85（中等），風速3 m/s，紫外線指數7（高）。若外出，請選擇陰涼處，10:00-16:00 減少戶外活動。'
            },
            {
              type: 'alert',
              content: 'PM2.5 超過80，6歲以下孩童可能出現咳嗽或過敏反應，建議家長留意。'
            }
          ]
        }
      ];
      setMessages(newMessages);
      setInput('');
    }, 1000);
  }, []);

  const renderMessage = (message, index) => {
    if (message.role === 'user') {
      return (
        <div key={index} className="flex justify-end items-start mb-4 gap-3">
          <div className="max-w-[75%]">
            <div className="bg-blue-500 text-white rounded-lg py-2 px-4">
              {message.content}
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
            <User className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      );
    }

    return (
      <div key={index} className="flex items-start mb-4 gap-3">
        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
          <Bot className="w-6 h-6 text-purple-600" />
        </div>
        <div className="max-w-[75%]">
          {message.content.map((item, i) => {
            if (item.type === 'text') {
              return (
                <div key={i} className="bg-gray-200 rounded-lg py-2 px-4 mb-2">
                  {item.content}
                </div>
              );
            }

            if (item.type === 'indicators') {
              return (
                <Card key={i} className="mb-2">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-orange-500" />
                      環境指標風險評估
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={pieData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={indicatorData[index].color} />
                              ))}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="middle" align="right" layout="vertical" />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="space-y-4">
                        {indicatorData.map((indicator, idx) => (
                          <div key={idx} className="bg-gray-50 rounded-lg p-3">
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-medium">{indicator.name}</span>
                              <span className="text-gray-600">{indicator.value}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="rounded-full h-2"
                                style={{
                                  width: `${(indicator.value / indicator.maxValue) * 100}%`,
                                  backgroundColor: indicator.color
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            }

            if (item.type === 'warning') {
              return (
                <div key={i} className="bg-orange-100 text-orange-800 rounded-lg py-2 px-4 mb-2">
                  {item.content}
                </div>
              );
            }

            if (item.type === 'alert') {
              return (
                <div key={i} className="bg-red-100 text-red-800 rounded-lg py-2 px-4 mb-2 flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>{item.content}</span>
                </div>
              );
            }

            return null;
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <Card className="h-[800px] flex flex-col">
        <CardHeader>
          <CardTitle className="text-xl">戶外活動建議助理</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <ScrollArea className="flex-1 pr-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                <p>👋 你好！我是戶外活動建議助理</p>
                <p className="mt-2">想知道今天適合戶外活動嗎？</p>
                <p className="mt-2 text-sm">例如：今天適合帶孩子去公園嗎？</p>
              </div>
            ) : (
              messages.map((msg, index) => renderMessage(msg, index))
            )}
          </ScrollArea>
          
          <div className="flex gap-2 mt-4">
            <Input
              placeholder="請輸入您的問題..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <Button onClick={() => {}}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OutdoorActivityAdvisor;