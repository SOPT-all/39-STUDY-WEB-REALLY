# Week2 챌린지 실습📤

> 각 파트의 첫 번째 챌린지를 선택  
> 조건부 렌더링/ 리스트 렌더링/ 순수성 총 3문제 진행  
> 트리 UI는 공식 챌린지가 없어 두 트리의 차이점을 README.md에 정리
> 각 실습 결과물은 PR에 넣어둠 !! 많관부

## 1. 조건부 렌더링

- 코드: [App.js](./01-conditional-rendering/App.js)
- 핵심: 삼항 연산자로 완료 여부에 따라 다른 아이콘을 표시한다.
- Hwang's 응용: 항목을 Hwang's TODO list로 변경했다.

## 2. 리스트 렌더링

- 코드: [실습 폴더](./02-rendering-lists/)
- 핵심: filter로 화학자와 나머지 사람을 나누고, map으로 각각 렌더링한다.
- 각 항목에는 안정적인 person.id를 key로 사용한다.
- 반복되는 목록 UI는 PeopleList 컴포넌트로 분리했다.

## 3. 컴포넌트 순수성

- 코드: [Clock.js](./03-keeping-components-pure/Clock.js)
- 핵심: 렌더링 중 DOM을 직접 변경하지 않고, 시간에 따라 계산한 className을 JSX로 전달한다.
- 같은 time 입력에는 같은 UI 결과를 계산하도록 수정했다.
