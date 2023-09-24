// The 'transcript_1g2cpw' program.
program transcript_1g2cpw.aleo {

    // A educational transcript.
    // - `owner`     : The address of the account that owns the record associated with this transcript.
    // - `issuer`    : The address of the account that issued this transcript.
    // - `total_gpa` : Total gpa across major courses and all other courses, supports three decimal places e.g. a 3.57 should be represented as 357 and a 4.0 should be represented as 400
    // - `major_gpa` : Total gpa across only major courses, does not include other courses, supports three decimal places e.g. a 3.57 should be represented as 357 and a 4.0 should be represented as 400
    // - `graduated` : Whether or not the owner of the transcript has graduated from the issuer institution
    // - `graduation_timestamp` : the timestamp of the graduation, defaults to 0, only valid if graduated is set to 'true'

    record Transcript {
        owner: address,
        issuer: address,
        total_gpa: u16,
        major_gpa: u16,
        graduated: bool,
        graduation_timestamp: i64
    }

    mapping check_total_gpa: field => u16;
    mapping is_graduated: field => bool;

    // The `issue_transcript` function initializes a new transcript record from the issuing authority to
    // the owner account, which is the student in question
    transition issue_transcript(owner: address, issuer: address, total_gpa: u16, major_gpa: u16, graduated: bool, graduation_timestamp: i64) -> Transcript {
        return Transcript {
            owner: owner,
            issuer: issuer,
            total_gpa: total_gpa,
            major_gpa: major_gpa,
            graduated: graduated,
            graduation_timestamp: graduation_timestamp
        };
    }

    transition check_is_graduated(owner: address) -> bool {
        return true;
    }


}
