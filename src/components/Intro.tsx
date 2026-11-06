import { useState } from "react";
import Dialog from "./Dialog";

function Intro() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="prose">
      <h1>Who decides in the European Parliament?</h1>
      <p>
        In its 10th legislative term, the European Parliament has shifted to the
        right, and majorities have become more flexible.
      </p>
      <p>
        The largest group, the European People’s Party (EPP), can form a
        majority with the Socialists and Democrats (S&D) and Renew Europe
        (Renew), often called the “von der Leyen coalition”.
      </p>
      <p>
        Alternatively, the EPP can turn right and form a majority with the
        European Conservatives and Reformists (ECR) and Patriots for Europe
        (PfE), plus either Renew or Europe of Sovereign Nations (ESN).
      </p>
      <p>
        This tool shows you votes that only passed with votes from one or more
        political group. Learn more about{" "}
        <a href="#" onClick={() => setDialogOpen(true)}>
          our methodology
        </a>
        .
      </p>

      <Dialog
        open={dialogOpen}
        title="Methodology"
        onOpenChange={(open) => setDialogOpen(open)}
      >
        <div className="prose">
          <h3>When is a political group decisive?</h3>
          <p>
            A group is decisive if the vote would not have passed had its MEPs
            who voted for instead voted against.
          </p>
          <p>
            <strong>Example:</strong> Were ESN or S&D decisive in this vote?
          </p>
          <table>
            <thead>
              <tr>
                <th>Group</th>
                <th>For</th>
                <th>Against</th>
                <th>Abstentions</th>
                <th>Did not vote</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>S&D</th>
                <td>1</td>
                <td>90</td>
                <td>0</td>
                <td>44</td>
              </tr>
              <tr>
                <th>ESN</th>
                <td>24</td>
                <td>0</td>
                <td>0</td>
                <td>3</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th>Total</th>
                <td>273</td>
                <td>256</td>
                <td>32</td>
                <td>158</td>
              </tr>
            </tfoot>
          </table>
          <p>
            Assume simple majority: The vote passes if more MEPs vote for than
            against. MEPs that abstain or do not vote are ignored. With 273
            votes for and 256 against, this vote passes.
          </p>
          <p>
            <strong>ESN is decisive:</strong> Flipping the 24 for votes, the
            vote wouldn’t have passed with only 273 - 24 = 249 votes for and 256
            + 24 = 280 votes against.
          </p>
          <p>
            <strong>S&D isn’t decisive:</strong> Flipping the single for vote,
            the vote would have still passed with 273 - 1 = 272 votes for and
            256 + 1 = 257 votes against.
          </p>
          <h3>What is the basis for the calculations?</h3>
          <p>
            This tool covers roll-call votes since the beginning of the 10th
            term of the European Parliament, including votes on amendments. As
            the tool shows votes that wouldn’t have passed without votes from
            certain groups, the base population is only adopted votes.
          </p>
          <p>
            To calculate which groups are decisive, we need to know the
            applicable majority type for each vote. While many votes only need a
            simple majority (more votes for than against) to pass, there are
            exceptions. The official data sources HowTheyVote.eu uses do not
            provide information necessary to compute the applicable majority
            type for all votes. For this reason, this tool can only show votes
            that were cast as part of one of the following procedure types:
          </p>
          <ul>
            <li>Ordinary Legislative Procedure (COD)</li>
            <li>Own-initiative Procedure (INI)</li>
            <li>Resolutions on topical subjects (RSP)</li>
          </ul>
          <p>
            As of Nov 1, 2026, these procedure types cover approximately 80% of
            all adopted roll-call votes in the 10th term.
          </p>
          <h3>Feedback</h3>
          <p>
            The Majority Tracker is built by the{" "}
            <a href="https://howtheyvote.eu" target="_blank" rel="noopener">
              HowTheyVote.eu
            </a>{" "}
            team. It is completely free to use, but we rely on feedback from
            users like you! Help us improve this tool by giving feedback in{" "}
            <a href="https://tally.so/r/zENZz1" target="_blank" rel="noopener">
              our very short survey
            </a>
            .
          </p>
          <h3>Acknowledgments</h3>
          <p>
            We would like to thank{" "}
            <a
              href="https://www.swp-berlin.org/en/researcher/paul-bochtler"
              target="_blank"
              rel="noopener"
            >
              Paul Bochtler
            </a>{" "}
            from the German Institute for International and Security Affairs for
            discussions on the calculation of decisive votes.
          </p>
        </div>
      </Dialog>
    </div>
  );
}

export default Intro;
