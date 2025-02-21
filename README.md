# mooncat-period
生理を記録するカスタマイズアプリ

# 各コマンド
npx expo start

npx create-expo-app@latest

npx expo lint
npx expo install prettier eslint-config-prettier eslint-plugin-prettier "--" --save-dev
npx expo install prettier eslint-config-prettier eslint-plugin-prettier "--" --dev

npx expo install typescript @types/react "--" --save-dev
npx expo install typescript @types/react "--" --dev

npx expo install ts-node "--" --save-dev
npx expo install ts-node "--" --dev

npm install react-native-paper
npm install react-native-safe-area-context
npx pod-install
npm install react-native-vector-icons

npm install dotenv


# 機能要件
・カレンダーで生理を表示  
・生理、症状、気分を入力するボタン  
・生理の統計データのチャート表示  
・次回の生理日や排卵日を予測

# 画面構成
・ホーム画面（カレンダー付き、記録の一覧）  
・記録入力画面（生理開始/終了、生理痛の程度、気分などの入力）  
・統計画面（過去のデータをグラフ表示）  
・設定画面（通知設定やカスタマイズ）  

# 使う技術
・React Native Paper  