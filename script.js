const input = document.getElementById("search");
const searchbtn = document.getElementById("searchdb");
const table = document.getElementById("result");
const totalres = document.getElementById("total");

searchbtn.addEventListener("click", async () => {
  let finalRes = [];
  const res = await fetch("/transact");
  const results = await res.json();
  let successArr = results["success"];
  let total = results["success"].length;
  successArr.forEach((arr) => {
    arr.forEach((el) => {
      finalRes.push(el);
    });
  });
  let html = `<tbody><tr>
                    <th>TABLE.COLUMN</th>
                    <th>VALUE</th>
                </tr>`;

  finalRes.forEach((element) => {
    let tc = element["TABLE.COLUMN"];
    let val = element["VALUE"];
    html += `<tr>
        <td>${tc}</td>
        <td>${val}</td>
      </tr>`;
  });
  html += `</tbody>`;
  table.innerHTML = html;
  totalres.innerText = `Showing 1 - ${total} of ${total}`;
  totalres.style.display = "block";
});
