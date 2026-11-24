# Week3 챌린지 실습📤

> 각 파트의 챌린지를 하나씩 선택  
> 각 실습 결과물은 PR에 넣어둠 !! 많관부

## 1. 이벤트에 응답하기

- 코드 [App.js](./01-responding-to-events/App.js)
- 핵심은 `handleClick`을 함수로 전달해서 클릭할 때만 실행시키는 것.
- 확인하기 → 처음 열었을 때 배경이 그대로인지 보고, 버튼을 두 번 눌러 검정 → 흰색으로 바뀌는지 확인.

## 2. State: 컴포넌트의 기억 저장소

- 코드 [App.js](./02-state-a-components-memory/App.js), [data.js](./02-state-a-components-memory/data.js)
- Hwang's 응용 → 조각상 갤러리를 Real:ly 스터디 기록 카드로 변경.
- 첫 카드에서는 `이전`, 마지막 카드에서는 `다음`을 비활성화했다.
- 확인하기 → `1 / 3`부터 시작해서 양 끝 버튼 상태 확인. 상세 설명을 열고 카드를 넘기면 다음 카드의 상세 설명이 보인다.
- 커밋 관찰 → 리뷰 초안을 입력하고 카드를 넘겨도 같은 입력창에 초안이 남는다.

## 4. 스냅샷으로서의 State

- 코드 [App.js](./04-state-as-a-snapshot/App.js)
- 핵심은 다음 상태 `nextWalk`를 계산해 setter와 알림에 같이 사용하는 것.
- 확인하기 → 첫 클릭은 `NextStop`, 두 번째 클릭은 `NextWalk`가 뜬다.
- `alert`를 `setWalk` 위로 옮겨도 메시지는 same. 같은 클릭에서 계산한 `nextWalk`를 쓰기 때문.

## 실행 방법?

각 공식 문서 챌린지 샌드박스에 해당 `App.js`를 붙여넣음.
갤러리는 `App.js`와 같은 위치의 `data.js`도 함께 교체할 것.
