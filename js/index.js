window.onload = function () {
  // 设置默认日期为今天
  document.addEventListener("DOMContentLoaded", function () {
    // 获取今天的日期
    const today = new Date();
    const formattedToday = formatDate(today);
    document.getElementById("endDate").value = formattedToday;

    // 初始化计算
    calculateDaysDifference();

    // 添加按钮点击事件
    document
      .getElementById("calculateBtn")
      .addEventListener("click", calculateDaysDifference);

    // 为日期输入框添加回车键触发计算
    document
      .getElementById("startDate")
      .addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          calculateDaysDifference();
        }
      });

    document
      .getElementById("endDate")
      .addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          calculateDaysDifference();
        }
      });
  });

  // 格式化日期为 YYYY-MM-DD
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // 格式化日期为中文显示
  function formatDateToChinese(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}年${month}月${day}日`;
  }

  // 获取星期几的中文表示
  function getDayOfWeekChinese(dateString) {
    const date = new Date(dateString);
    const days = [
      "星期日",
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六",
    ];
    return days[date.getDay()];
  }

  // 计算两个日期之间的天数差
  function calculateDaysDifference() {
    const startDateInput = document.getElementById("startDate").value;
    const endDateInput = document.getElementById("endDate").value;

    if (!startDateInput || !endDateInput) {
      alert("请选择开始日期和结束日期");
      return;
    }

    const startDate = new Date(startDateInput);
    const endDate = new Date(endDateInput);

    // 确保结束日期不早于开始日期
    if (endDate < startDate) {
      alert("结束日期不能早于开始日期");
      return;
    }

    // 计算天数差
    const timeDiff = endDate.getTime() - startDate.getTime();
    const daysDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));

    // 计算总时长（年和月）
    const years = (daysDifference / 365).toFixed(2);
    const months = (daysDifference / 30.44).toFixed(2); // 平均每月天数

    // 更新结果显示
    document.getElementById("displayStartDate").textContent =
      formatDateToChinese(startDateInput);
    document.getElementById("displayEndDate").textContent =
      formatDateToChinese(endDateInput);
    document.getElementById("daysDifference").textContent = daysDifference;
    document.getElementById("startDayOfWeek").textContent =
      getDayOfWeekChinese(startDateInput);
    document.getElementById("endDayOfWeek").textContent =
      getDayOfWeekChinese(endDateInput);
    document.getElementById(
      "totalDuration"
    ).textContent = `约 ${years} 年 / ${months} 个月`;

    // 添加结果动画
    const resultElement = document.getElementById("result");
    resultElement.classList.add("animate-pulse");
    setTimeout(() => {
      resultElement.classList.remove("animate-pulse");
    }, 1000);
  }
};
