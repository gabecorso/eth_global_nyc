program transcript_1g2cpw.aleo;

record Transcript:
    owner as address.private;
    issuer as address.private;
    total_gpa as u16.private;
    major_gpa as u16.private;
    graduated as boolean.private;
    graduation_timestamp as i64.private;


function issue_transcript:
    input r0 as address.private;
    input r1 as address.private;
    input r2 as u16.private;
    input r3 as u16.private;
    input r4 as boolean.private;
    input r5 as i64.private;
    cast r0 r1 r2 r3 r4 r5 into r6 as Transcript.record;
    output r6 as Transcript.record;
