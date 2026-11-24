# Week4. 상호작용성 더하기 ②

> State 업데이트 큐/ 객체 업데이트/ 배열 업데이트

Week3에서 그런 말을 했었죠 (어깨가무겁다)
`+1` 세 번 해서 진짜 `+3` 만드는 방법, 다음 주에 알아보자고.

약속 지키러 왔습니다,응응.

이번에는 숫자부터 객체/ 배열까지  
**이전 State를 바탕으로 다음 State 만드는 법** 알아보자.

## 학습 자료

- [State 업데이트 큐](https://ko.react.dev/learn/queueing-a-series-of-state-updates)
- [객체 State 업데이트하기](https://ko.react.dev/learn/updating-objects-in-state)
- [배열 State 업데이트하기](https://ko.react.dev/learn/updating-arrays-in-state)
- [useState 레퍼런스](https://ko.react.dev/reference/react/useState)

---

## 1. State 업데이트 큐

### +1 세 번 했는데 1이었던 사건, 기억나세요?

이번 렌더링의 `count`는 `0`이라고 해보자.

```jsx
function handleClick() {
  setCount(count + 1);
  setCount(count + 1);
  setCount(count + 1);
}
```

세 줄 모두 `setCount(1)`.  
지금 실행 중인 핸들러의 `count`는 계속 `0`이기 때문.

여기에 **배칭(batching)**도 연결된단다.

React는 이벤트 핸들러 안의 코드가 끝날 때까지 기다렸다가 업데이트를 모아 처리한다.  
setter 호출마다 화면이 중간중간 바뀌는 것을 줄여주는 것.

단, 각각 따로 누른 클릭은 개별적으로 처리된다.  
`+1` 버튼 세 번 클릭하는 상황까지 한꺼번에 묶는다고 생각하면 곤란하십니다 ~~

### 진짜 +3, 업데이터 함수 등장

```jsx
function handleClick() {
  setCount((prevCount) => prevCount + 1);
  setCount((prevCount) => prevCount + 1);
  setCount((prevCount) => prevCount + 1);
}
```

업데이터 함수는 **큐에서 앞선 업데이트를 적용한 값**을 받아 다음 값을 반환한다.

| 순서    | 전달받은 값 | 반환한 값 |
| ------- | ----------- | --------- |
| 첫 번째 | 0           | 1         |
| 두 번째 | 1           | 2         |
| 세 번째 | 2           | 3         |

최종 결과는 `3`. 드디어 **이름값 하는** +3 버튼.

### 값과 함수를 섞어도? 들어온 순서대로

```jsx
// 이번 렌더링의 count는 0
setCount(count + 5);
setCount((prevCount) => prevCount + 1);
setCount(42);
```

| 큐에 들어간 요청     | 처리 결과 |
| -------------------- | --------- |
| 5로 교체             | 5         |
| 앞선 결과에 1 더하기 | 6         |
| 42로 교체            | 42        |

값을 전달하면 해당 값으로 교체하고,  
함수를 전달하면 앞선 결과로 계산한다?

그래서 'setter는 마지막 것만 적용된다'로 외우면 업데이터에서 막힘주의보.

### 업데이터 안에는 다음 값 계산만

```jsx
setCount((prevCount) => prevCount + 1);
```

업데이터는 렌더링 중 실행되므로 순수해야 한다.  
API 요청/ 알림/ 다른 setter 호출은 이벤트 핸들러 등 적절한 위치에 두자.

개발 환경의 Strict Mode에서는 순수성 확인을 위해 업데이터를 두 번 호출 **가넝한**.
그중 한 결과를 사용하므로 순수한 계산이면 숫자가 두 배로 올라가지 ❌❌

### H황의 한 줄 정리

다음 값이 이전 업데이트 결과에 달렸다면?  
업데이터에게 이어서 계산해달라고 부탁 오네가이시마스.

---

## 2. 객체 State 업데이트하기

### 이름만 바꿨는데, 뭐가 문제야?

```jsx
const [profile, setProfile] = useState({
  name: "HWANG",
  week: 4,
});

// 기존 State 객체를 직접 변경
profile.name = "Real:ly 스터디장";
setProfile(profile);
```

객체는 JavaScript에서 변경 가능하지만, State에서는 읽기 전용처럼 다룬다.

위 코드는 기존 객체를 바꾸고 **같은 객체 참조**를 다시 넘긴다.  
React는 `Object.is` 비교로 같은 값이면 업데이트를 건너뛸 수 있다.

### 새 객체 만들고, 바꿀 값은 뒤에

```jsx
function handleNameChange(event) {
  const nextName = event.target.value;

  setProfile((prevProfile) => ({
    ...prevProfile,
    name: nextName,
  }));
}
```

기존 속성을 복사하고 `name`을 덮어쓴다.  
`week`도 함께 유지됨.

`useState`의 setter는 전달한 객체로 State를 교체한다.  
`setProfile({ name: nextName })`만 넘기면? `week`는 새 객체에 없다.

**전개 순서**도 중요 !!

```jsx
{ ...profile, name: "NEW HWANG" } // new 이름 적용
{ name: "NEW HWANG", ...profile } // 기존 name이 덮어씀
```

### 중첩 객체는 한 번 펼치면 the end?

```jsx
const [member, setMember] = useState({
  name: "HWANG",
  study: {
    title: "Real:ly",
    week: 3,
  },
});
```

`...`는 **얕은 복사**다.  
바깥 객체만 복사하면 내부의 `study` 객체 참조는 공유됨.

```jsx
const nextMember = { ...member };

// 기존 State의 study도 바뀜
nextMember.study.week = 4;
```

바뀌는 속성부터 최상위 객체까지 새로 만들자.

```jsx
setMember((prevMember) => ({
  ...prevMember,
  study: {
    ...prevMember.study,
    week: 4,
  },
}));
```

### 새로 만든 객체는 변경해도 된다

```jsx
const nextProfile = { ...profile };
nextProfile.name = "NEW HWANG";
setProfile(nextProfile);
```

이렇게 방금 만든 객체의 속성을 바꾸는 **지역 변경**은 가능.
단, 얕은 복사로 공유된 내부 객체까지 건드리는 건 주의 !!

### H황의 한 줄 정리

객체 펼쳤다고 내부까지 새것 되는 건 아니었으세요~  
변경하는 경로를 따라 필요한 객체를 복사하자.

---

## 3. 배열 State 업데이트하기

### Hwang's TODO list, 이번에는 수정도 해보자

컴포넌트 안에 아래 State가 있다고 해보자.

```jsx
const [tasks, setTasks] = useState([
  { id: 1, title: "Week4 리드미 작성", done: false },
  { id: 2, title: "리얼리동지's PR 리뷰", done: false },
]);
```

### 추가는 전개, 삭제는 filter

새 항목을 기존 목록 뒤에 추가한다.

```jsx
function handleAdd() {
  const newTask = {
    id: crypto.randomUUID(),
    title: "리뷰 댓글 답변",
    done: false,
  };

  setTasks((prevTasks) => [...prevTasks, newTask]);
}
```

ID는 이벤트 핸들러에서 생성해두고, 업데이터에서는 다음 배열을 계산한다.

```jsx
function handleDelete(taskId) {
  setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
}
```

### 수정은 map, 수정할 객체도 새로

```jsx
function handleToggle(taskId) {
  setTasks((prevTasks) =>
    prevTasks.map((task) =>
      task.id === taskId ? { ...task, done: !task.done } : task,
    ),
  );
}
```

대상 항목은 새 객체로 만들고,
나머지 항목은 기존 참조를 유지한다.

새 배열만 만들어놓고 `nextTasks[0].done = true` 하면?  
배열 안의 객체는 공유될 수 있어서 기존 State도 바뀐다.

### 배열 메서드, 잠깐 보고 가실게요

| 할 일        | 기존 배열을 변경하는 메서드 | 새 배열을 만드는 방법 |
| ------------ | --------------------------- | --------------------- |
| 추가         | `push`, `unshift`           | 전개 구문, `concat`   |
| 삭제         | `pop`, `shift`, `splice`    | `filter`, `slice`     |
| 교체         | 인덱스에 직접 할당          | `map`                 |
| 정렬/ 뒤집기 | `sort`, `reverse`           | 복사 후 정렬/ 뒤집기  |

```jsx
setTasks((prevTasks) => {
  const nextTasks = [...prevTasks];
  nextTasks.reverse();
  return nextTasks;
});
```

`slice`는 복사, `splice`는 원본을 변경.  
철자 하나 차이로 원본까지 건드릴 수 있음. PLZ 확인 ~~

중간에 삽입할 때는 `slice`로 나눠서 이어붙이면 된다. 이말임.

```jsx
const nextTasks = [
  ...tasks.slice(0, insertAt),
  newTask,
  ...tasks.slice(insertAt),
];
```

### H황의 한 줄 정리

배열을 바꿀 땐 새 배열, 항목을 바꿀 땐 새 항목까지.  
복사의 범위를 확인하자,응응.

---

## 4. 중첩이 깊어지면? Immer도 있다

객체/ 배열이 깊게 중첩되어 복사가 길어지면 Immer를 사용할 수 있다.

`use-immer`의 Hook을 쓰는 예시 보시죠.

```jsx
import { useImmer } from "use-immer";

const [member, updateMember] = useImmer({
  name: "HWANG",
  study: { title: "Real:ly", week: 3 },
});

function handleNextWeek() {
  updateMember((draft) => {
    draft.study.week += 1;
  });
}
```

Hook 선언은 컴포넌트 최상위에 둠.

Immer가 제공한 `draft`를 수정하면 변경 사항을 바탕으로 다음 State를 만들어준다.  
일반 `useState`에서도 같은 방식으로 직접 변경해도 된다고 생각하면? 함정.

---

## Hwang's SELF questions?

1. **업데이터로 바꾸면 같은 핸들러의 `count`도 바로 바뀔까?**  
   그 핸들러는 여전히 해당 렌더링의 스냅샷을 읽는다. 업데이터는 다음 State 계산에 사용된다.

2. **객체를 바꾼 다음 같은 객체를 setter에 넘기면?**  
   기존 State를 변경한 데다 같은 참조를 전달해서 업데이트가 건너뛰어질 수 있다.

3. **불변성을 지키려면 매번 전부 깊은 복사해야 할까?**  
   바뀌는 경로의 객체와 배열을 새로 만든다. 변경하지 않는 부분은 공유할 수 있다.

4. **`map`으로 감싸면 내부 객체를 수정해도 될까?**  
   새 배열이 생겨도 내부 객체 참조는 남는다. 변경할 항목도 새 객체로 만들어야 한다.

5. **업데이터 함수는 언제 쓰면 좋을까?**  
   이전 State로 다음 값을 계산할 때. 같은 이벤트에서 여러 업데이트를 이어갈 때도 유용하다.

---

Week3의 [왜 아직 0이세요?]에서  
이번에는 [다음 값을 어떻게 계산하고 전달할까요?]까지.

이제 Real:ly TODO도 추가하고, 수정하고, 완료 처리까지 가능.  
남은 건 실제로 과제를 완료하는 일 .. 🫪
