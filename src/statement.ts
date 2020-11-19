import { Invoice, Performance, Play, PlayItem } from "./interface";

export function statement(invoice: Invoice, plays: Play) {
  let result = `Statement for ${invoice.customer}\n`;
  for (let perf of invoice.performances) {
    result += `  ${playFor(perf).name}: ${format(amountFor(perf))} (${
      perf.audience
    } seats)\n`;
  }
  result += `Amount owed is ${format(totalAmount())}\n`;
  result += `You earned ${totalVolumeCredits()} credits\n`;
  return result;

  /**
   * @param number
   * @return {string}
   */
  function format(number: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(number / 100);
  }
  /**
   *
   * @return {number}
   */
  function totalVolumeCredits() {
    let result = 0;
    for (const performance of invoice.performances) {
      result += volumeCreditsFor(performance);
    }
    return result;
  }
  /**
   *
   * @param perf
   * @return {number}
   */
  function volumeCreditsFor(perf: Performance) {
    let result = 0;
    result += Math.max(perf.audience - 30, 0);
    // add extra credit for every ten comedy attendees
    if ("comedy" === playFor(perf).type)
      result += Math.floor(perf.audience / 5);
    return result;
  }
  /**
   *
   * @return {number}
   */
  function totalAmount() {
    let result = 0;
    for (const performance of invoice.performances) {
      result += amountFor(performance);
    }
    return result;
  }

  /**
   *
   * @param perf
   * @return {PlayItem}
   */
  function playFor(perf: Performance) {
    return plays[perf.playID];
  }

  /**
   *
   * @param perf
   * @return {number}
   */
  function amountFor(perf: Performance) {
    let result = 0;
    const play = playFor(perf);
    switch (play.type) {
      case "tragedy":
        result = 40000;
        if (perf.audience > 30) {
          result += 1000 * (perf.audience - 30);
        }
        break;
      case "comedy":
        result = 30000;
        if (perf.audience > 20) {
          result += 10000 + 500 * (perf.audience - 20);
        }
        result += 300 * perf.audience;
        break;
      default:
        throw new Error(`unknown type: ${play.type}`);
    }
    return result;
  }
}
