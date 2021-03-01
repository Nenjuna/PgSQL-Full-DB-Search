/**
 * Script file that is responsible for making API calls to the backend server.
 *
 * Once the results are fetched, they are then processed and displayed as tables
 *
 *  ----------------------------------------------------------------
 * */

// preparing the objects to exchange data and to manipulate the data in the DOM

const input = document.getElementById("search");
const searchbtn = document.getElementById("searchdb");
const table = document.getElementById("result");
const totalres = document.getElementById("total");
const loader = document.querySelector(".loader");
const success = document.getElementById("success");
const warning = document.getElementById("warning");
const resres = document.querySelector(".res");

//Event listener that listens for the click and invokes the API call to the backend server

searchbtn.addEventListener("click", async () => {
  let searchval = input.value;
  if (searchval.length > 0) {
    loader.style.display = "block";
    getResults(searchval);
  } else {
    console.log("warning");
  }
});

// Main function that is responsible for fetching the data and is responsible for adding to the DOM

async function getResults(searchval) {
  // Final variable where the results are stored// append: Append a value to a key

  // Making API call to the express server

  try {
    let finalRes = [];
    const res = await fetch(`/transact?id=${searchval}`);
    const results = await res.json();

    let status = results["status"];

    // If the status is success then the DOM is modified and the resuls are updated accordingly

    if (status === "success") {
      let successArr = results["result"];
      let total = results["result"].length;
      successArr.forEach((arr) => {
        arr.forEach((el) => {
          finalRes.push(el);
        });
      });
      let html = `<tbody><tr>
                    <th>TABLE | COLUMN</th>
                    <th>VALUE</th>
                </tr>`;

      finalRes.forEach((element) => {
        let tc = element["TABLE.COLUMN"].toUpperCase().split(".");
        let val = element["VALUE"];
        html += `<tr>
        <td><span class="table">${tc[0]}</span><span class="column">${tc[1]}</span></td>
        <td>${val}</td>
      </tr>`;
      });
      html += `</tbody>`;
      table.innerHTML = html;
      totalres.innerText = `Fetched ${total} entries from the database`;
      resres.style.display = "block";
      totalres.style.display = "block";
      success.style.display = "block";
      loader.style.display = "none";
    }

    // If the result fails then we are throwing generic error to the user
    else {
      warning.style.display = "block";
    }
  } catch {
    warning.style.display = "block";
    loader.style.display = "none";
  }
}
