const chai = require("chai");

const { expect } = chai;
const { SendSMS } = require("../../../../src/modules/command/Mc/index");

describe("send_sms Test", () => {
  it("should return mc object", () => {
    const params = { 
      action: "send-sms",
      from: {
          type: "phone_num",
          id: "test id"
      },
      to: {
          type: "phone_num",
          id: "test id"
      },
      content: {
          type: "text",
          text: "test text"
      }
    };
    let obj = new SendSMS(params);

    expect(params).to.deep.eq(obj.get());

    obj = new SendSMS();
    obj.from("test id");
    obj.to("test id");
    obj.content("test text");

    expect(params).to.deep.eq(obj.get());
  });

  it("should auto define action", () => {
    const obj = new SendSMS();
    obj.from("test id");
    obj.to("test id");
    obj.content("test text");

    expect(obj.get().action).to.eq("send-sms");
  });

  it("should throw if required field not set", () => {
    expect(() => {
      new SendSMS().get();
    }).to.throw();
  });
});
