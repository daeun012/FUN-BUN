const Match = require('../models/Match');

module.exports = {
  getMatch: async (matchId) => {
    try {
      let result = await Match.findById(matchId).populate({ path: 'members', select: 'username grade' }).lean();
      if (!result) throw new Error('채팅방을 찾을 수 없습니다.');
      return result;
    } catch (err) {
      throw err;
    }
  },

  getRandomMatch: async (grade, dept) => {
    try {
      // 학과 매칭방 가져오기
      let matchList = await Match.find({ dept }).populate({ path: 'members', select: 'grade' }).lean();

      // 빈 배열이라면 null 리턴
      if (matchList.length === 0) {
        return null;
      }

      // 그 중 인원이 다 차고 이미 포함된 학년이 있는 매칭방 필터
      let unMatchList = matchList.filter(
        (match) =>
          match.members.length !== 4 &&
          match.members.some((member) => {
            return member.grade !== grade;
          })
      );

      // 필터 후 빈배열이라면 null 리턴
      if (unMatchList.length === 0) {
        return null;
      }

      // 인원이 한명인 매칭방이 있다면
      let result = unMatchList.filter((match) => match.members.length === 1);
      if (result.length !== 0) {
        // 오래된 매칭방부터 리턴
        console.log(result);
        return result[0];
      } else {
        // 인원이 2명
        result = unMatchList.filter((match) => match.members.length === 2);
        if (result.length !== 0) {
          console.log(unMatchList);
          return result[0];
        } else {
          // 인원이 3명
          console.log(unMatchList);
          result = unMatchList.filter((match) => match.members.length === 3);
          if (result.length !== 0) {
            return result[0];
          }
        }
      }
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },

  createMatch: async (uid, dept) => {
    try {
      const newMatch = new Match({
        members: uid,
        dept: dept,
      });
      let result = await newMatch.save();
      return result;
    } catch (err) {
      throw new Error(err);
    }
  },

  updateMatch: async (uid, matchId) => {
    try {
      let result = await Match.findOneAndUpdate({ _id: matchId }, { $push: { members: uid } }, { new: true })
        .populate({ path: 'members', select: 'username grade' })
        .lean();
      return result;
    } catch (err) {
      throw new Error(err);
    }
  },
};
