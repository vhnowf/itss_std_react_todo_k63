import React, { useState } from 'react';

/* 
  【Todoのデータ構成】
　・key：Todoを特定するID（String）
　・text：Todoの内容（String）
　・done：完了状態（Boolean true:完了済み,, false:未完了）
*/

/* コンポーネント */
import TodoItem from './TodoItem';
import Input from './Input';
import Filter from './Filter';

/* カスタムフック */
import useStorage from '../hooks/storage';

/* ライブラリ */
import {getKey} from "../lib/util";



function Todo() {
  const [items, putItems, clearItems] = useStorage();
  
  const [filter, setFilter] = React.useState('ALL');
   
  const filteredItems = items.filter(item => {
     if (filter === 'ALL') return true;
     if (filter === 'TODO') return !item.done;
     if (filter === 'DONE') return item.done;
   });
  

   const handleFilter = (value) => {
     setFilter(value);
   }
  
   const handleCheck = checked => {
      const newItems = items.map(item => {
        if (item.key === checked.key) {
          item.done = !item.done;
        }
        return item;
      });
      putItems(newItems);
    };
  
  const addTodo = (todo) => {
     const item = {
       key: getKey(4),
       text:todo,
       done: false
     };
     items.push(item);
     putItems([...items]);
   }

  return (
    <div className="panel">
      <div className="panel-heading">
        ITSS ToDoアプリ
      </div>
      <Input onAddTodo={addTodo} />
      <Filter 
         onChange={handleFilter}
         value={filter}
      />
      {filteredItems.map(item => (
        <TodoItem 
          key = {item.key}
          item= {item}
          onCheck={handleCheck}
        />
      ))}
      <div className="panel-block">
        {filteredItems.length} items
      </div>
      <div className="panel-block">
         <button className="button is-light is-fullwidth" onClick={clearItems}>
           全てのToDoを削除
         </button>
       </div>
    </div>
  );
}

export default Todo;